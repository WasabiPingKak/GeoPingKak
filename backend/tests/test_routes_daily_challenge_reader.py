"""Integration tests for GET /api/daily-challenge."""

from unittest.mock import MagicMock, patch


def _mock_doc(exists=True, data=None):
    doc = MagicMock()
    doc.exists = exists
    doc.to_dict.return_value = data
    return doc


class TestGetWithMonthParam:
    """GET /api/daily-challenge?month=YYYY-MM"""

    @patch("repositories.daily_challenge_repo.get_collection_name", return_value="daily_challenge")
    def test_returns_entries(self, _col, client, mock_db):
        mock_db.return_value.document.return_value.get.return_value = _mock_doc(
            data={
                "01": [{"mapId": "world-theworld", "challengeUrl": "https://geo.com/1"}],
                "15": [{"mapId": "tw-urban", "challengeUrl": "https://geo.com/2"}],
            }
        )

        resp = client.get("/api/daily-challenge?month=2026-03")
        assert resp.status_code == 200
        data = resp.get_json()
        assert len(data) == 2
        # createdAt should be injected as "YYYY-MM-DD"
        dates = {e["createdAt"] for e in data}
        assert "2026-03-01" in dates
        assert "2026-03-15" in dates

    @patch("repositories.daily_challenge_repo.get_collection_name", return_value="daily_challenge")
    def test_nonexistent_month_returns_empty(self, _col, client, mock_db):
        mock_db.return_value.document.return_value.get.return_value = _mock_doc(exists=False)

        resp = client.get("/api/daily-challenge?month=2020-01")
        assert resp.status_code == 200
        assert resp.get_json() == []

    def test_invalid_month_format(self, client):
        resp = client.get("/api/daily-challenge?month=bad")
        assert resp.status_code == 400
        data = resp.get_json()
        assert data["error_code"] == "INVALID_FORMAT"
        assert "Invalid month format" in data["message"]

    def test_invalid_month_13(self, client):
        resp = client.get("/api/daily-challenge?month=2026-13")
        assert resp.status_code == 400


class TestGetAvailableMonths:
    """GET /api/daily-challenge/months"""

    @patch("repositories.daily_challenge_repo.get_collection_name", return_value="daily_challenge")
    def test_returns_sorted_months(self, _col, client, mock_db):
        # list_documents returns an iterator of document references
        doc_refs = []
        for month_id in ["2025-11", "2026-03", "2026-01"]:
            ref = MagicMock()
            ref.id = month_id
            doc_refs.append(ref)
        mock_db.return_value.list_documents.return_value = doc_refs

        resp = client.get("/api/daily-challenge/months")
        assert resp.status_code == 200
        data = resp.get_json()
        assert data == ["2026-03", "2026-01", "2025-11"]

    @patch("repositories.daily_challenge_repo.get_collection_name", return_value="daily_challenge")
    def test_empty_collection(self, _col, client, mock_db):
        mock_db.return_value.list_documents.return_value = []

        resp = client.get("/api/daily-challenge/months")
        assert resp.status_code == 200
        assert resp.get_json() == []


class TestGetDefault:
    """GET /api/daily-challenge (no param — current + previous month)"""

    @patch("repositories.daily_challenge_repo.get_collection_name", return_value="daily_challenge")
    def test_returns_two_months(self, _col, client, mock_db):
        mock_db.return_value.document.return_value.get.return_value = _mock_doc(
            data={"10": [{"mapId": "tw-urban", "challengeUrl": "https://geo.com/x"}]}
        )

        resp = client.get("/api/daily-challenge")
        assert resp.status_code == 200
        # Two month docs each returning 1 entry
        assert len(resp.get_json()) == 2
