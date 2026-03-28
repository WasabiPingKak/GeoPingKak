"""Shared fixtures for backend tests."""

from unittest.mock import MagicMock, patch

import pytest

# Patch Firebase initialization BEFORE importing app module.
# In CI, GCP credentials are unavailable, so firebase_admin.firestore.client()
# would raise DefaultCredentialsError at import time.
_mock_db = MagicMock()
patch("firebase_admin._apps", {"[DEFAULT]": MagicMock()}).start()
patch("firebase_admin.firestore.client", return_value=_mock_db).start()

import app as app_module  # noqa: E402

# Replace the db reference so route closures use our mock
app_module.db = _mock_db


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
