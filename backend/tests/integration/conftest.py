"""Fixtures for Firestore Emulator integration tests.

Prerequisites:
    1. Install Firebase CLI: npm install -g firebase-tools
    2. Start emulator: firebase emulators:start --only firestore
       (from project root where firebase.json lives)
    3. Run tests: cd backend && pytest tests/integration/ -v

Tests are auto-skipped when the emulator is not running.
"""

import os
import socket
from unittest.mock import patch

import pytest
import requests

EMULATOR_HOST = "127.0.0.1:8080"
PROJECT_ID = "demo-geopingkak"


def _emulator_is_running():
    host, port = EMULATOR_HOST.split(":")
    try:
        with socket.create_connection((host, int(port)), timeout=2):
            return True
    except OSError:
        return False


def pytest_collection_modifyitems(config, items):
    """Auto-skip all integration tests when emulator is not running."""
    if not _emulator_is_running():
        skip = pytest.mark.skip(reason="Firestore emulator not running on " + EMULATOR_HOST)
        for item in items:
            item.add_marker(skip)


@pytest.fixture(scope="session")
def emulator_db():
    """Firestore client connected to the local emulator."""
    import firebase_admin
    from firebase_admin import credentials, firestore

    os.environ["FIRESTORE_EMULATOR_HOST"] = EMULATOR_HOST

    app_name = "integration-test"
    try:
        app = firebase_admin.get_app(app_name)
    except ValueError:
        cred = credentials.ApplicationDefault()
        app = firebase_admin.initialize_app(cred, {"projectId": PROJECT_ID}, name=app_name)

    db = firestore.client(app)
    yield db

    firebase_admin.delete_app(app)
    del os.environ["FIRESTORE_EMULATOR_HOST"]


@pytest.fixture(autouse=True)
def _clean_firestore():
    """Clear all emulator data after each test for isolation."""
    yield
    requests.delete(
        f"http://{EMULATOR_HOST}/emulator/v1/projects/{PROJECT_ID}/databases/(default)/documents",
        timeout=5,
    )


@pytest.fixture()
def daily_challenge_repo(emulator_db):
    from repositories.daily_challenge_repo import DailyChallengeRepo

    with patch("repositories.daily_challenge_repo.get_collection_name", side_effect=lambda x: x):
        yield DailyChallengeRepo(emulator_db)


@pytest.fixture()
def special_map_repo(emulator_db):
    from repositories.special_map_repo import SpecialMapRepo

    with patch("repositories.special_map_repo.get_collection_name", side_effect=lambda x: x):
        yield SpecialMapRepo(emulator_db)


@pytest.fixture()
def video_explanation_repo(emulator_db):
    from repositories.video_explanation_repo import VideoExplanationRepo

    with patch("repositories.video_explanation_repo.get_collection_name", side_effect=lambda x: x):
        yield VideoExplanationRepo(emulator_db)
