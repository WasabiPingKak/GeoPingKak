"""Integration tests for daily challenge reader routes against Firestore Emulator."""

import json


class TestGetWithMonthParam:
    def test_returns_entries(self, client, daily_challenge_repo):
        daily_challenge_repo.write_day_entries(
            "2026-04",
            "03",
            [
                {"mapId": "world", "challengeUrl": "https://geoguessr.com/challenge/abc"},
                {"mapId": "tw", "challengeUrl": "https://geoguessr.com/challenge/def"},
            ],
        )

        resp = client.get("/api/daily-challenge?month=2026-04")
        assert resp.status_code == 200
        data = json.loads(resp.data)
        assert len(data) == 2
        assert data[0]["createdAt"] == "2026-04-03"

    def test_nonexistent_month_returns_empty(self, client):
        resp = client.get("/api/daily-challenge?month=1999-01")
        assert resp.status_code == 200
        assert json.loads(resp.data) == []


class TestGetAvailableMonths:
    def test_returns_sorted_months(self, client, daily_challenge_repo):
        daily_challenge_repo.write_day_entries("2026-01", "01", [{"mapId": "world"}])
        daily_challenge_repo.write_day_entries("2026-03", "01", [{"mapId": "world"}])
        daily_challenge_repo.write_day_entries("2026-02", "01", [{"mapId": "world"}])

        resp = client.get("/api/daily-challenge/months")
        assert resp.status_code == 200
        assert json.loads(resp.data) == ["2026-03", "2026-02", "2026-01"]

    def test_empty_collection(self, client):
        resp = client.get("/api/daily-challenge/months")
        assert resp.status_code == 200
        assert json.loads(resp.data) == []
