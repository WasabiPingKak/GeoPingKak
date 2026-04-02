"""Integration tests for video explanation routes against Firestore Emulator."""

import json
from unittest.mock import patch

AUTH_HEADERS = {"Authorization": "Bearer test-token", "Content-Type": "application/json"}


class TestGetVideoExplanations:
    def test_returns_seeded_data(self, client, video_explanation_repo):
        video_explanation_repo.save("2026-04-01", {"world": {"videoUrl": "https://youtube.com/watch?v=aaa"}})
        video_explanation_repo.save("2026-04-02", {"tw": {"videoUrl": "https://youtube.com/watch?v=bbb"}})

        resp = client.get("/api/video-explanations")
        assert resp.status_code == 200
        data = json.loads(resp.data)
        assert len(data) == 2
        assert "2026-04-01" in data

    def test_empty_collection(self, client):
        resp = client.get("/api/video-explanations")
        assert resp.status_code == 200
        assert json.loads(resp.data) == {}


class TestPostVideoExplanations:
    @patch("routes.video_explanation_routes.VIDEO_ADMIN_TOKEN", "test-token")
    def test_writes_with_cross_collection_lookup(self, client, daily_challenge_repo):
        """POST looks up challengeUrl from daily_challenge and writes to video_explanations."""
        # Seed daily_challenge so lookup succeeds
        daily_challenge_repo.write_day_entries(
            "2026-04",
            "03",
            [{"mapId": "world-theworld", "challengeUrl": "https://geoguessr.com/challenge/found"}],
        )

        resp = client.post(
            "/api/video-explanations",
            json={
                "date": "2026-04-03",
                "maps": {"world-theworld": {"livestream": "https://youtube.com/watch?v=live1"}},
            },
            headers=AUTH_HEADERS,
        )
        assert resp.status_code == 200
        data = json.loads(resp.data)
        assert data["success"] is True
        assert "world-theworld" in data["updated_maps"]

        # Verify data persisted with challengeUrl populated
        resp = client.get("/api/video-explanations")
        result = json.loads(resp.data)
        assert result["2026-04-03"]["world-theworld"]["challengeUrl"] == "https://geoguessr.com/challenge/found"

    @patch("routes.video_explanation_routes.VIDEO_ADMIN_TOKEN", "test-token")
    def test_missing_challenge_url_returns_404(self, client):
        """POST returns 404 when daily_challenge has no matching entry."""
        resp = client.post(
            "/api/video-explanations",
            json={
                "date": "2026-04-03",
                "maps": {"world-theworld": {"livestream": "https://youtube.com/watch?v=live1"}},
            },
            headers=AUTH_HEADERS,
        )
        assert resp.status_code == 404
