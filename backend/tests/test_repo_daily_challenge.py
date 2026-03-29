"""Unit tests for DailyChallengeRepo."""

from unittest.mock import MagicMock, patch

import pytest
from repositories.daily_challenge_repo import DailyChallengeRepo


def _mock_doc(exists=True, data=None):
    doc = MagicMock()
    doc.exists = exists
    doc.to_dict.return_value = data
    return doc


@pytest.fixture()
def repo():
    db = MagicMock()
    with patch(
        "repositories.daily_challenge_repo.get_collection_name",
        return_value="daily_challenge",
    ):
        yield DailyChallengeRepo(db)


class TestListMonths:
    def test_returns_sorted_desc(self, repo):
        doc1 = MagicMock()
        doc1.id = "2026-01"
        doc2 = MagicMock()
        doc2.id = "2026-03"
        doc3 = MagicMock()
        doc3.id = "2026-02"
        repo.db.collection.return_value.list_documents.return_value = [doc1, doc2, doc3]

        result = repo.list_months()
        assert result == ["2026-03", "2026-02", "2026-01"]

    def test_empty_collection(self, repo):
        repo.db.collection.return_value.list_documents.return_value = []
        assert repo.list_months() == []


class TestReadMonth:
    def test_returns_entries_with_created_at(self, repo):
        repo.db.collection.return_value.document.return_value.get.return_value = _mock_doc(
            data={
                "01": [{"mapId": "world", "challengeUrl": "https://geo.com/1"}],
                "15": [{"mapId": "tw", "challengeUrl": "https://geo.com/2"}],
            }
        )

        entries = repo.read_month("2026-03")
        assert len(entries) == 2
        dates = {e["createdAt"] for e in entries}
        assert dates == {"2026-03-01", "2026-03-15"}

    def test_doc_not_exists(self, repo):
        repo.db.collection.return_value.document.return_value.get.return_value = _mock_doc(exists=False)
        assert repo.read_month("2026-01") == []

    def test_doc_empty_dict(self, repo):
        repo.db.collection.return_value.document.return_value.get.return_value = _mock_doc(data=None)
        assert repo.read_month("2026-01") == []

    def test_skips_non_list_entries(self, repo):
        repo.db.collection.return_value.document.return_value.get.return_value = _mock_doc(
            data={
                "01": [{"mapId": "world"}],
                "02": "invalid",
            }
        )
        entries = repo.read_month("2026-03")
        assert len(entries) == 1
        assert entries[0]["mapId"] == "world"


class TestReadDayEntries:
    def test_returns_day_entries(self, repo):
        expected = [{"mapId": "world", "challengeUrl": "https://geo.com/1"}]
        repo.db.collection.return_value.document.return_value.get.return_value = _mock_doc(data={"15": expected})
        assert repo.read_day_entries("2026-03", "15") == expected

    def test_missing_day_key(self, repo):
        repo.db.collection.return_value.document.return_value.get.return_value = _mock_doc(
            data={"01": [{"mapId": "world"}]}
        )
        assert repo.read_day_entries("2026-03", "15") == []

    def test_doc_not_exists(self, repo):
        repo.db.collection.return_value.document.return_value.get.return_value = _mock_doc(exists=False)
        assert repo.read_day_entries("2026-03", "15") == []


class TestWriteDayEntries:
    def test_calls_set_with_merge(self, repo):
        entries = [{"mapId": "world", "challengeUrl": "https://geo.com/1"}]
        repo.write_day_entries("2026-03", "15", entries)

        doc_ref = repo.db.collection.return_value.document.return_value
        doc_ref.set.assert_called_once_with({"15": entries}, merge=True)


class TestLookupChallengeUrl:
    def test_found(self, repo):
        repo.db.collection.return_value.document.return_value.get.return_value = _mock_doc(
            data={
                "15": [
                    {"mapId": "world", "challengeUrl": "https://geo.com/abc"},
                    {"mapId": "tw", "challengeUrl": "https://geo.com/def"},
                ],
            }
        )
        assert repo.lookup_challenge_url("2026-03-15", "tw") == "https://geo.com/def"

    def test_not_found(self, repo):
        repo.db.collection.return_value.document.return_value.get.return_value = _mock_doc(
            data={"15": [{"mapId": "world"}]}
        )
        assert repo.lookup_challenge_url("2026-03-15", "tw") is None

    def test_no_entries_for_day(self, repo):
        repo.db.collection.return_value.document.return_value.get.return_value = _mock_doc(exists=False)
        assert repo.lookup_challenge_url("2026-03-15", "tw") is None
