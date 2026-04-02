"""Integration tests for VideoExplanationRepo against Firestore Emulator."""


class TestGetAll:
    def test_empty_collection_returns_empty_dict(self, video_explanation_repo):
        assert video_explanation_repo.get_all() == {}

    def test_returns_all_dates(self, video_explanation_repo):
        video_explanation_repo.save("2026-04-01", {"world": {"videoUrl": "https://youtube.com/watch?v=aaa"}})
        video_explanation_repo.save("2026-04-02", {"tw": {"videoUrl": "https://youtube.com/watch?v=bbb"}})

        result = video_explanation_repo.get_all()
        assert len(result) == 2
        assert "2026-04-01" in result
        assert "2026-04-02" in result
        assert result["2026-04-01"]["world"]["videoUrl"] == "https://youtube.com/watch?v=aaa"


class TestSave:
    def test_round_trip(self, video_explanation_repo):
        maps_data = {
            "world": {"videoUrl": "https://youtube.com/watch?v=aaa", "comment": "好難"},
            "tw": {"videoUrl": "https://youtube.com/watch?v=bbb", "comment": "簡單"},
        }
        video_explanation_repo.save("2026-04-03", maps_data)

        result = video_explanation_repo.get_all()
        assert result["2026-04-03"] == maps_data

    def test_merge_preserves_other_maps(self, video_explanation_repo):
        """Writing map B should not overwrite map A in the same date doc."""
        video_explanation_repo.save("2026-04-03", {"world": {"videoUrl": "https://youtube.com/watch?v=aaa"}})
        video_explanation_repo.save("2026-04-03", {"tw": {"videoUrl": "https://youtube.com/watch?v=bbb"}})

        result = video_explanation_repo.get_all()
        data = result["2026-04-03"]
        assert data["world"]["videoUrl"] == "https://youtube.com/watch?v=aaa"
        assert data["tw"]["videoUrl"] == "https://youtube.com/watch?v=bbb"

    def test_overwrite_same_map(self, video_explanation_repo):
        video_explanation_repo.save("2026-04-03", {"world": {"videoUrl": "https://youtube.com/watch?v=old"}})
        video_explanation_repo.save("2026-04-03", {"world": {"videoUrl": "https://youtube.com/watch?v=new"}})

        result = video_explanation_repo.get_all()
        assert result["2026-04-03"]["world"]["videoUrl"] == "https://youtube.com/watch?v=new"
