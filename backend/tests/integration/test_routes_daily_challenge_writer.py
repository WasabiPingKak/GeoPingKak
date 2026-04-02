"""Integration tests for daily challenge writer routes against Firestore Emulator."""

import json
from unittest.mock import patch

from services.geoguessr_challenge import ChallengeFailure, ChallengeResult


class TestWriteFlow:
    @patch("routes.daily_challenge_writer.ADMIN_API_KEY", "test-key")
    @patch("routes.daily_challenge_writer.create_challenge")
    def test_creates_and_writes_to_firestore(self, mock_create, client, daily_challenge_repo):
        """POST creates challenges via GeoGuessr API and persists to Firestore."""
        mock_create.return_value = ChallengeResult(url="https://geoguessr.com/challenge/xyz")

        resp = client.post(
            "/api/admin/update-daily-challenge",
            json={"country": "hk"},
            headers={"Authorization": "Bearer test-key", "Content-Type": "application/json"},
        )

        assert resp.status_code == 200
        data = json.loads(resp.data)
        assert data["status"] == "ok"
        assert data["count"] == 1

        # Verify data was actually written to Firestore emulator
        months = daily_challenge_repo.list_months()
        assert len(months) == 1

    @patch("routes.daily_challenge_writer.ADMIN_API_KEY", "test-key")
    @patch("routes.daily_challenge_writer.create_challenge")
    def test_partial_failure_still_writes(self, mock_create, client, daily_challenge_repo):
        """Partial failure writes successful maps and reports failures."""
        mock_create.side_effect = [
            ChallengeResult(url="https://geoguessr.com/challenge/ok"),
            ChallengeResult(url=None, failure=ChallengeFailure.TIMEOUT),
        ]

        resp = client.post(
            "/api/admin/update-daily-challenge",
            json={"country": "world"},
            headers={"Authorization": "Bearer test-key", "Content-Type": "application/json"},
        )

        assert resp.status_code == 200
        data = json.loads(resp.data)
        assert data["status"] == "partial"
        assert len(data["failed_maps"]) == 1

        # Verify the successful map was persisted
        months = daily_challenge_repo.list_months()
        assert len(months) == 1
