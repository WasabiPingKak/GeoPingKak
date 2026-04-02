"""Integration tests for SpecialMapRepo against Firestore Emulator."""


class TestGetDocument:
    def test_nonexistent_returns_empty_dict(self, special_map_repo):
        assert special_map_repo.get_document("nonexistent") == {}

    def test_round_trip(self, special_map_repo):
        entries = [
            {"mapId": "fun-map", "name": "歡樂地圖", "url": "https://geoguessr.com/maps/abc"},
        ]
        special_map_repo.save_entries("themed", "fun_maps", entries)

        result = special_map_repo.get_document("themed")
        assert result == {"fun_maps": entries}


class TestMergeSemantics:
    def test_merge_preserves_other_fields(self, special_map_repo):
        """Writing field B should not overwrite field A in the same doc."""
        entries_a = [{"mapId": "a", "name": "地圖A"}]
        entries_b = [{"mapId": "b", "name": "地圖B"}]

        special_map_repo.save_entries("themed", "fun_maps", entries_a)
        special_map_repo.save_entries("themed", "hard_maps", entries_b)

        result = special_map_repo.get_document("themed")
        assert result["fun_maps"] == entries_a
        assert result["hard_maps"] == entries_b

    def test_overwrite_same_field(self, special_map_repo):
        old = [{"mapId": "old"}]
        new = [{"mapId": "new"}]

        special_map_repo.save_entries("themed", "fun_maps", old)
        special_map_repo.save_entries("themed", "fun_maps", new)

        result = special_map_repo.get_document("themed")
        assert result["fun_maps"] == new
