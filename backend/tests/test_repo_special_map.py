"""Unit tests for SpecialMapRepo."""

from unittest.mock import MagicMock, patch

import pytest

from repositories.special_map_repo import SpecialMapRepo


def _mock_doc(exists=True, data=None):
    doc = MagicMock()
    doc.exists = exists
    doc.to_dict.return_value = data
    return doc


@pytest.fixture()
def repo():
    db = MagicMock()
    with patch(
        "repositories.special_map_repo.get_collection_name",
        return_value="special_maps",
    ):
        yield SpecialMapRepo(db)


class TestGetDocument:
    def test_returns_data(self, repo):
        expected = {"entries": [{"name": "Map A"}]}
        repo.db.collection.return_value.document.return_value.get.return_value = _mock_doc(data=expected)
        assert repo.get_document("themed") == expected

    def test_doc_not_exists(self, repo):
        repo.db.collection.return_value.document.return_value.get.return_value = _mock_doc(exists=False)
        assert repo.get_document("themed") == {}

    def test_doc_empty_dict(self, repo):
        repo.db.collection.return_value.document.return_value.get.return_value = _mock_doc(data=None)
        assert repo.get_document("themed") == {}


class TestSaveEntries:
    def test_calls_set_with_merge(self, repo):
        entries = [{"name": "Map A"}]
        repo.save_entries("themed", "fun_maps", entries)

        doc_ref = repo.db.collection.return_value.document.return_value
        doc_ref.set.assert_called_once_with({"fun_maps": entries}, merge=True)
