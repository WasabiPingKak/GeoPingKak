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
from pathlib import Path
from unittest.mock import patch

import pytest
import requests
from google.cloud.firestore import Client as FirestoreClient

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
    """Auto-skip integration tests when emulator is not running."""
    if not _emulator_is_running():
        skip = pytest.mark.skip(reason="Firestore emulator not running on " + EMULATOR_HOST)
        integration_dir = str(Path(__file__).parent)
        for item in items:
            if str(item.fspath).startswith(integration_dir):
                item.add_marker(skip)


@pytest.fixture(scope="session")
def emulator_db():
    """Firestore client connected to the local emulator.

    Uses google.cloud.firestore.Client directly instead of firebase_admin
    to bypass the global firebase_admin.firestore.client mock in tests/conftest.py.
    """
    os.environ["FIRESTORE_EMULATOR_HOST"] = EMULATOR_HOST

    db = FirestoreClient(project=PROJECT_ID)
    yield db

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


@pytest.fixture()
def client(emulator_db):
    """Flask test client with routes connected to Firestore emulator.

    Patches app_module.db.collection so all repos (which captured db via
    closure at init time) route their Firestore calls to the emulator.
    """
    import app as app_module
    from utils.rate_limiter import limiter

    original_collection = app_module.db.collection
    app_module.db.collection = emulator_db.collection

    app_module.app.config["TESTING"] = True
    app_module.app.config["RATELIMIT_ENABLED"] = False
    limiter.reset()

    with patch("config.get_collection_name", side_effect=lambda x: x):
        with app_module.app.test_client() as c:
            yield c

    app_module.db.collection = original_collection
