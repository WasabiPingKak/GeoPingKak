"""Integration tests for /api/special-map."""

from unittest.mock import MagicMock, patch


def _mock_doc(exists=True, data=None):
    doc = MagicMock()
    doc.exists = exists
    doc.to_dict.return_value = data or {}
    return doc


VALID_TOKEN = "test-admin-key"
AUTH_HEADER = {"Authorization": f"Bearer {VALID_TOKEN}"}


class TestGetSpecialMap:
    @patch("repositories.special_map_repo.get_collection_name", return_value="special_maps")
    def test_returns_entries(self, _col, client, mock_db):
        mock_db.return_value.document.return_value.get.return_value = _mock_doc(
            data={
                "tw-funny": [
                    {
                        "mapId": "special-tw-funny",
                        "challengeUrl": "https://www.geoguessr.com/challenge/abc",
                        "createdAt": "2026-01-01T00:00:00",
                    },
                ],
                "tw-pun": [],
            }
        )

        resp = client.get("/api/special-map")
        assert resp.status_code == 200
        data = resp.get_json()
        assert any(e["mapId"] == "special-tw-funny" for e in data)

    @patch("repositories.special_map_repo.get_collection_name", return_value="special_maps")
    def test_empty_collection(self, _col, client, mock_db):
        mock_db.return_value.document.return_value.get.return_value = _mock_doc(exists=False)

        resp = client.get("/api/special-map")
        assert resp.status_code == 200
        assert resp.get_json() == []


class TestPostSpecialMap:
    def test_no_auth_returns_401(self, client):
        resp = client.post("/api/special-map", json={"mapId": "special-tw-funny", "challengeUrl": "https://www.geoguessr.com/challenge/abc"})
        assert resp.status_code == 401

    @patch("routes.special_map_routes.verify_bearer_token", return_value=True)
    def test_missing_fields_returns_400(self, _auth, client):
        resp = client.post("/api/special-map", json={}, headers=AUTH_HEADER)
        assert resp.status_code == 400

    @patch("routes.special_map_routes.verify_bearer_token", return_value=True)
    def test_invalid_url_returns_400(self, _auth, client):
        resp = client.post(
            "/api/special-map",
            json={"mapId": "special-tw-funny", "challengeUrl": "https://not-geoguessr.com/bad"},
            headers=AUTH_HEADER,
        )
        assert resp.status_code == 400
        assert "Invalid challengeUrl" in resp.get_json()["error"]

    @patch("routes.special_map_routes.verify_bearer_token", return_value=True)
    def test_unknown_map_id_returns_400(self, _auth, client):
        resp = client.post(
            "/api/special-map",
            json={"mapId": "unknown-id", "challengeUrl": "https://www.geoguessr.com/challenge/abc"},
            headers=AUTH_HEADER,
        )
        assert resp.status_code == 400
        assert "Unknown mapId" in resp.get_json()["error"]

    @patch("repositories.special_map_repo.get_collection_name", return_value="special_maps")
    @patch("routes.special_map_routes.verify_bearer_token", return_value=True)
    def test_successful_add(self, _auth, _col, client, mock_db):
        mock_db.return_value.document.return_value.get.return_value = _mock_doc(
            data={"tw-funny": []}
        )

        resp = client.post(
            "/api/special-map",
            json={"mapId": "special-tw-funny", "challengeUrl": "https://www.geoguessr.com/challenge/new123"},
            headers=AUTH_HEADER,
        )
        assert resp.status_code == 200
        data = resp.get_json()
        assert data["length"] == 1
        mock_db.return_value.document.return_value.set.assert_called_once()

    @patch("repositories.special_map_repo.get_collection_name", return_value="special_maps")
    @patch("routes.special_map_routes.verify_bearer_token", return_value=True)
    def test_duplicate_url_returns_duplicate(self, _auth, _col, client, mock_db):
        existing_url = "https://www.geoguessr.com/challenge/existing"
        mock_db.return_value.document.return_value.get.return_value = _mock_doc(
            data={"tw-funny": [{"challengeUrl": existing_url}]}
        )

        resp = client.post(
            "/api/special-map",
            json={"mapId": "special-tw-funny", "challengeUrl": existing_url},
            headers=AUTH_HEADER,
        )
        assert resp.status_code == 200
        assert resp.get_json()["status"] == "duplicate"
