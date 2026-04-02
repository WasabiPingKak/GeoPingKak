"""Integration tests for special map routes against Firestore Emulator."""

import json
from unittest.mock import patch

AUTH_HEADERS = {"Authorization": "Bearer test-key", "Content-Type": "application/json"}


class TestGetSpecialMap:
    def test_returns_seeded_entries(self, client, special_map_repo):
        special_map_repo.save_entries(
            "tw_maps",
            "tw-funny",
            [
                {
                    "mapId": "special-tw-funny",
                    "challengeUrl": "https://www.geoguessr.com/challenge/abc",
                    "country": "台灣主題",
                    "createdAt": "2026-04-03T00:00:00+00:00",
                }
            ],
        )

        resp = client.get("/api/special-map")
        assert resp.status_code == 200
        data = json.loads(resp.data)
        assert len(data) == 1
        assert data[0]["mapId"] == "special-tw-funny"
        assert data[0]["title"] == "奇怪地名 01"

    def test_empty_collection(self, client):
        resp = client.get("/api/special-map")
        assert resp.status_code == 200
        assert json.loads(resp.data) == []


class TestPostSpecialMap:
    @patch.dict("os.environ", {"ADMIN_API_KEY": "test-key"})
    def test_add_and_read_back(self, client):
        """POST adds entry, GET reads it back from Firestore."""
        resp = client.post(
            "/api/special-map",
            json={
                "mapId": "special-tw-funny",
                "challengeUrl": "https://www.geoguessr.com/challenge/new123",
            },
            headers=AUTH_HEADERS,
        )
        assert resp.status_code == 200
        data = json.loads(resp.data)
        assert data["field"] == "tw-funny"
        assert data["length"] == 1

        # Verify via GET
        resp = client.get("/api/special-map")
        data = json.loads(resp.data)
        urls = [e["challengeUrl"] for e in data]
        assert "https://www.geoguessr.com/challenge/new123" in urls

    @patch.dict("os.environ", {"ADMIN_API_KEY": "test-key"})
    def test_duplicate_detection(self, client):
        """POST same URL twice returns duplicate status."""
        payload = {
            "mapId": "special-tw-funny",
            "challengeUrl": "https://www.geoguessr.com/challenge/dup",
        }
        resp1 = client.post("/api/special-map", json=payload, headers=AUTH_HEADERS)
        assert resp1.status_code == 200

        resp2 = client.post("/api/special-map", json=payload, headers=AUTH_HEADERS)
        assert resp2.status_code == 200
        assert json.loads(resp2.data)["status"] == "duplicate"
