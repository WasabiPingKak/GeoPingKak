"""Unit tests for VideoExplanationRepo."""

from unittest.mock import MagicMock, patch

import pytest
from repositories.video_explanation_repo import VideoExplanationRepo


@pytest.fixture()
def repo():
    db = MagicMock()
    with patch(
        "repositories.video_explanation_repo.get_collection_name",
        return_value="video_explanations",
    ):
        yield VideoExplanationRepo(db)


class TestGetAll:
    def test_returns_all_docs(self, repo):
        doc1 = MagicMock()
        doc1.id = "2026-03-01"
        doc1.to_dict.return_value = {"world": {"youtubeUrl": "https://yt.com/1"}}

        doc2 = MagicMock()
        doc2.id = "2026-03-02"
        doc2.to_dict.return_value = {"tw": {"youtubeUrl": "https://yt.com/2"}}

        repo.db.collection.return_value.stream.return_value = [doc1, doc2]

        result = repo.get_all()
        assert result == {
            "2026-03-01": {"world": {"youtubeUrl": "https://yt.com/1"}},
            "2026-03-02": {"tw": {"youtubeUrl": "https://yt.com/2"}},
        }

    def test_skips_empty_docs(self, repo):
        doc1 = MagicMock()
        doc1.id = "2026-03-01"
        doc1.to_dict.return_value = {"world": {"youtubeUrl": "https://yt.com/1"}}

        doc_empty = MagicMock()
        doc_empty.id = "2026-03-02"
        doc_empty.to_dict.return_value = {}

        repo.db.collection.return_value.stream.return_value = [doc1, doc_empty]

        result = repo.get_all()
        assert result == {"2026-03-01": {"world": {"youtubeUrl": "https://yt.com/1"}}}

    def test_empty_collection(self, repo):
        repo.db.collection.return_value.stream.return_value = []
        assert repo.get_all() == {}


class TestSave:
    def test_calls_set_with_merge(self, repo):
        maps_data = {"world": {"youtubeUrl": "https://yt.com/1"}}
        repo.save("2026-03-01", maps_data)

        doc_ref = repo.db.collection.return_value.document.return_value
        doc_ref.set.assert_called_once_with(maps_data, merge=True)
