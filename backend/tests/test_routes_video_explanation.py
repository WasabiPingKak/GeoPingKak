"""Integration tests for /api/video-explanations."""

from unittest.mock import MagicMock, patch


def _mock_doc(exists=True, data=None):
    doc = MagicMock()
    doc.exists = exists
    doc.to_dict.return_value = data or {}
    doc.id = "2026-01-15"
    return doc


VALID_TOKEN = "test-video-token"
AUTH_HEADER = {"Authorization": f"Bearer {VALID_TOKEN}"}


class TestGetVideoExplanations:
    @patch("routes.video_explanation_routes.get_collection_name", return_value="video_explanations")
    def test_returns_all_dates(self, _col, client, mock_db):
        doc1 = _mock_doc(data={"tw-urban": {"livestream": "https://youtube.com/1"}})
        doc1.id = "2026-01-15"
        doc2 = _mock_doc(data={"jp-urban": {"explanation": "https://youtube.com/2"}})
        doc2.id = "2026-01-16"
        mock_db.return_value.stream.return_value = [doc1, doc2]

        resp = client.get("/api/video-explanations")
        assert resp.status_code == 200
        data = resp.get_json()
        assert "2026-01-15" in data
        assert "2026-01-16" in data

    @patch("routes.video_explanation_routes.get_collection_name", return_value="video_explanations")
    def test_empty_collection(self, _col, client, mock_db):
        mock_db.return_value.stream.return_value = []

        resp = client.get("/api/video-explanations")
        assert resp.status_code == 200
        assert resp.get_json() == {}


class TestPostVideoExplanationsAuth:
    def test_no_token_returns_401(self, client):
        resp = client.post("/api/video-explanations", json={"date": "2026-01-15", "maps": {}})
        assert resp.status_code == 401

    @patch("routes.video_explanation_routes.os.getenv", return_value=VALID_TOKEN)
    def test_wrong_token_returns_401(self, _env, client):
        resp = client.post(
            "/api/video-explanations",
            json={"date": "2026-01-15", "maps": {}},
            headers={"Authorization": "Bearer wrong"},
        )
        assert resp.status_code == 401


class TestPostVideoExplanationsValidation:
    @patch("routes.video_explanation_routes.verify_bearer_token", return_value=True)
    def test_empty_body_returns_400(self, _auth, client):
        resp = client.post("/api/video-explanations", json={}, headers=AUTH_HEADER)
        assert resp.status_code == 400

    @patch("routes.video_explanation_routes.verify_bearer_token", return_value=True)
    def test_no_content_type_returns_500(self, _auth, client):
        """No JSON content-type triggers route's exception handler."""
        resp = client.post("/api/video-explanations", headers=AUTH_HEADER)
        assert resp.status_code == 500

    @patch("routes.video_explanation_routes.verify_bearer_token", return_value=True)
    def test_missing_date(self, _auth, client):
        resp = client.post(
            "/api/video-explanations",
            json={"maps": {"tw-urban": {"livestream": "https://youtube.com/x"}}},
            headers=AUTH_HEADER,
        )
        assert resp.status_code == 400

    @patch("routes.video_explanation_routes.verify_bearer_token", return_value=True)
    def test_invalid_date_format(self, _auth, client):
        resp = client.post(
            "/api/video-explanations",
            json={"date": "not-a-date", "maps": {"tw-urban": {"livestream": "https://youtube.com/x"}}},
            headers=AUTH_HEADER,
        )
        assert resp.status_code == 400
        assert "Invalid date format" in resp.get_json()["message"]

    @patch("routes.video_explanation_routes.verify_bearer_token", return_value=True)
    def test_invalid_map_id(self, _auth, client):
        resp = client.post(
            "/api/video-explanations",
            json={"date": "2026-01-15", "maps": {"invalid-map": {"livestream": "https://youtube.com/x"}}},
            headers=AUTH_HEADER,
        )
        assert resp.status_code == 400
        assert "Invalid map ID" in resp.get_json()["message"]

    @patch("routes.video_explanation_routes.verify_bearer_token", return_value=True)
    def test_invalid_youtube_url(self, _auth, client):
        resp = client.post(
            "/api/video-explanations",
            json={"date": "2026-01-15", "maps": {"tw-urban": {"livestream": "https://not-youtube.com/x"}}},
            headers=AUTH_HEADER,
        )
        assert resp.status_code == 400
        assert "YouTube URL" in resp.get_json()["message"]

    @patch("routes.video_explanation_routes.verify_bearer_token", return_value=True)
    def test_all_empty_maps_returns_400(self, _auth, client):
        resp = client.post(
            "/api/video-explanations",
            json={"date": "2026-01-15", "maps": {"tw-urban": {"livestream": "", "explanation": ""}}},
            headers=AUTH_HEADER,
        )
        assert resp.status_code == 400
        assert "No valid map data" in resp.get_json()["message"]


class TestPostVideoExplanationsSuccess:
    @patch("routes.video_explanation_routes.get_collection_name", return_value="video_explanations")
    @patch("routes.video_explanation_routes.verify_bearer_token", return_value=True)
    def test_writes_with_challenge_url(self, _auth, _col, client, mock_db):
        # Mock daily_challenge lookup
        daily_doc = MagicMock()
        daily_doc.exists = True
        daily_doc.to_dict.return_value = {
            "15": [{"mapId": "tw-urban", "challengeUrl": "https://www.geoguessr.com/challenge/abc"}]
        }

        # First call = daily_challenge lookup, second call = video_explanations write
        mock_db.return_value.document.return_value.get.return_value = daily_doc

        resp = client.post(
            "/api/video-explanations",
            json={
                "date": "2026-01-15",
                "maps": {"tw-urban": {"livestream": "https://youtube.com/live1"}},
            },
            headers=AUTH_HEADER,
        )
        assert resp.status_code == 200
        data = resp.get_json()
        assert data["success"] is True
        assert "tw-urban" in data["updated_maps"]

    @patch("routes.video_explanation_routes.get_collection_name", return_value="daily_challenge")
    @patch("routes.video_explanation_routes.verify_bearer_token", return_value=True)
    def test_missing_challenge_url_returns_404(self, _auth, _col, client, mock_db):
        mock_db.return_value.document.return_value.get.return_value = _mock_doc(exists=False)

        resp = client.post(
            "/api/video-explanations",
            json={
                "date": "2026-01-15",
                "maps": {"tw-urban": {"livestream": "https://youtube.com/live1"}},
            },
            headers=AUTH_HEADER,
        )
        assert resp.status_code == 404
        assert "Cannot find challengeUrl" in resp.get_json()["message"]
