"""Integration tests for DailyChallengeRepo against Firestore Emulator."""


class TestWriteAndRead:
    def test_round_trip(self, daily_challenge_repo):
        entries = [
            {"mapId": "world", "challengeUrl": "https://geoguessr.com/challenge/abc"},
            {"mapId": "tw", "challengeUrl": "https://geoguessr.com/challenge/def"},
        ]
        daily_challenge_repo.write_day_entries("2026-04", "03", entries)

        result = daily_challenge_repo.read_day_entries("2026-04", "03")
        assert result == entries

    def test_merge_preserves_other_days(self, daily_challenge_repo):
        """merge=True should keep day 03 when writing day 04."""
        entries_03 = [{"mapId": "world", "challengeUrl": "https://geoguessr.com/challenge/a"}]
        entries_04 = [{"mapId": "tw", "challengeUrl": "https://geoguessr.com/challenge/b"}]

        daily_challenge_repo.write_day_entries("2026-04", "03", entries_03)
        daily_challenge_repo.write_day_entries("2026-04", "04", entries_04)

        assert daily_challenge_repo.read_day_entries("2026-04", "03") == entries_03
        assert daily_challenge_repo.read_day_entries("2026-04", "04") == entries_04

    def test_overwrite_same_day(self, daily_challenge_repo):
        old = [{"mapId": "world", "challengeUrl": "https://geoguessr.com/challenge/old"}]
        new = [{"mapId": "world", "challengeUrl": "https://geoguessr.com/challenge/new"}]

        daily_challenge_repo.write_day_entries("2026-04", "03", old)
        daily_challenge_repo.write_day_entries("2026-04", "03", new)

        assert daily_challenge_repo.read_day_entries("2026-04", "03") == new


class TestReadMonth:
    def test_injects_created_at(self, daily_challenge_repo):
        entries = [{"mapId": "world", "challengeUrl": "https://geoguessr.com/challenge/abc"}]
        daily_challenge_repo.write_day_entries("2026-04", "03", entries)

        result = daily_challenge_repo.read_month("2026-04")
        assert len(result) == 1
        assert result[0]["createdAt"] == "2026-04-03"
        assert result[0]["mapId"] == "world"

    def test_multiple_days(self, daily_challenge_repo):
        daily_challenge_repo.write_day_entries("2026-04", "01", [{"mapId": "world", "challengeUrl": "url1"}])
        daily_challenge_repo.write_day_entries("2026-04", "02", [{"mapId": "tw", "challengeUrl": "url2"}])

        result = daily_challenge_repo.read_month("2026-04")
        assert len(result) == 2
        dates = {e["createdAt"] for e in result}
        assert dates == {"2026-04-01", "2026-04-02"}

    def test_nonexistent_month_returns_empty(self, daily_challenge_repo):
        assert daily_challenge_repo.read_month("1999-01") == []


class TestListMonths:
    def test_returns_sorted_descending(self, daily_challenge_repo):
        daily_challenge_repo.write_day_entries("2026-01", "01", [{"mapId": "world"}])
        daily_challenge_repo.write_day_entries("2026-03", "01", [{"mapId": "world"}])
        daily_challenge_repo.write_day_entries("2026-02", "01", [{"mapId": "world"}])

        months = daily_challenge_repo.list_months()
        assert months == ["2026-03", "2026-02", "2026-01"]

    def test_empty_collection(self, daily_challenge_repo):
        assert daily_challenge_repo.list_months() == []


class TestLookupChallengeUrl:
    def test_found(self, daily_challenge_repo):
        entries = [
            {"mapId": "world", "challengeUrl": "https://geoguessr.com/challenge/abc"},
            {"mapId": "tw", "challengeUrl": "https://geoguessr.com/challenge/def"},
        ]
        daily_challenge_repo.write_day_entries("2026-04", "03", entries)

        url = daily_challenge_repo.lookup_challenge_url("2026-04-03", "tw")
        assert url == "https://geoguessr.com/challenge/def"

    def test_not_found_wrong_map_id(self, daily_challenge_repo):
        entries = [{"mapId": "world", "challengeUrl": "https://geoguessr.com/challenge/abc"}]
        daily_challenge_repo.write_day_entries("2026-04", "03", entries)

        assert daily_challenge_repo.lookup_challenge_url("2026-04-03", "nonexistent") is None

    def test_not_found_wrong_date(self, daily_challenge_repo):
        entries = [{"mapId": "world", "challengeUrl": "https://geoguessr.com/challenge/abc"}]
        daily_challenge_repo.write_day_entries("2026-04", "03", entries)

        assert daily_challenge_repo.lookup_challenge_url("2026-04-05", "world") is None
