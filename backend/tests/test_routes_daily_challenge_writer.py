"""Integration tests for POST /api/admin/update-daily-challenge."""

from unittest.mock import MagicMock, patch


def _mock_doc(exists=True, data=None):
    doc = MagicMock()
    doc.exists = exists
    doc.to_dict.return_value = data or {}
    return doc


VALID_TOKEN = "test-admin-key"
AUTH_HEADER = {"Authorization": f"Bearer {VALID_TOKEN}"}


class TestAuth:
    def test_no_token_returns_401(self, client):
        resp = client.post("/api/admin/update-daily-challenge", json={"country": "tw"})
        assert resp.status_code == 401

    @patch("routes.daily_challenge_writer.ADMIN_API_KEY", VALID_TOKEN)
    def test_wrong_token_returns_401(self, client):
        resp = client.post(
            "/api/admin/update-daily-challenge",
            json={"country": "tw"},
            headers={"Authorization": "Bearer wrong"},
        )
        assert resp.status_code == 401


class TestValidation:
    @patch("routes.daily_challenge_writer.ADMIN_API_KEY", VALID_TOKEN)
    def test_empty_body_returns_400(self, client):
        resp = client.post(
            "/api/admin/update-daily-challenge",
            json={},
            headers=AUTH_HEADER,
        )
        assert resp.status_code == 400

    @patch("routes.daily_challenge_writer.ADMIN_API_KEY", VALID_TOKEN)
    def test_no_content_type_returns_415(self, client):
        """No JSON content-type returns 415 Unsupported Media Type."""
        resp = client.post("/api/admin/update-daily-challenge", headers=AUTH_HEADER)
        assert resp.status_code == 415
        assert resp.get_json()["message"] == "Unsupported Media Type"

    @patch("routes.daily_challenge_writer.ADMIN_API_KEY", VALID_TOKEN)
    def test_invalid_country(self, client):
        resp = client.post(
            "/api/admin/update-daily-challenge",
            json={"country": "invalid"},
            headers=AUTH_HEADER,
        )
        assert resp.status_code == 400
        data = resp.get_json()
        assert data["error_code"] == "INVALID_FIELD"
        assert "Invalid country" in data["message"]


class TestSuccess:
    @patch("routes.daily_challenge_writer.create_challenge", return_value="https://www.geoguessr.com/challenge/abc123")
    @patch("repositories.daily_challenge_repo.get_collection_name", return_value="daily_challenge")
    @patch("routes.daily_challenge_writer.ADMIN_API_KEY", VALID_TOKEN)
    def test_creates_challenge_and_writes(self, _col, mock_create, client, mock_db):
        mock_db.return_value.document.return_value.get.return_value = _mock_doc(exists=False)

        resp = client.post(
            "/api/admin/update-daily-challenge",
            json={"country": "hk"},
            headers=AUTH_HEADER,
        )
        assert resp.status_code == 200
        data = resp.get_json()
        assert data["status"] == "ok"
        assert data["count"] == 1

        # Verify Firestore set was called
        mock_db.return_value.document.return_value.set.assert_called_once()

    @patch("routes.daily_challenge_writer.create_challenge", return_value=None)
    @patch("repositories.daily_challenge_repo.get_collection_name", return_value="daily_challenge")
    @patch("routes.daily_challenge_writer.ADMIN_API_KEY", VALID_TOKEN)
    def test_skips_failed_challenge_creation(self, _col, mock_create, client, mock_db):
        mock_db.return_value.document.return_value.get.return_value = _mock_doc(exists=False)

        resp = client.post(
            "/api/admin/update-daily-challenge",
            json={"country": "hk"},
            headers=AUTH_HEADER,
        )
        assert resp.status_code == 200
        assert resp.get_json()["count"] == 0
