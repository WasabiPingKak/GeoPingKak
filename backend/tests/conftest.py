"""Shared fixtures for backend tests."""

from unittest.mock import MagicMock, patch

import pytest

import app as app_module


@pytest.fixture()
def client():
    """Flask test client."""
    app_module.app.config["TESTING"] = True
    with app_module.app.test_client() as c:
        yield c


@pytest.fixture()
def mock_db():
    """Mock the Firestore client's .collection() method.

    The route closures captured app.db by reference, so we patch
    db.collection directly on the live object.
    """
    mock_collection = MagicMock()
    with patch.object(app_module.db, "collection", mock_collection):
        yield mock_collection
