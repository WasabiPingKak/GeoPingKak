"""Unit tests for validators module."""

from validators import validate_date, validate_geoguessr_url, validate_youtube_url


class TestValidateDate:
    def test_valid_date(self):
        assert validate_date("2026-01-15") is True

    def test_valid_leap_day(self):
        assert validate_date("2024-02-29") is True

    def test_invalid_format(self):
        assert validate_date("2026/01/15") is False

    def test_invalid_month(self):
        assert validate_date("2026-13-01") is False

    def test_invalid_day(self):
        assert validate_date("2026-02-30") is False

    def test_empty_string(self):
        assert validate_date("") is False

    def test_partial_date(self):
        assert validate_date("2026-01") is False


class TestValidateYoutubeUrl:
    def test_valid_youtube_com(self):
        assert validate_youtube_url("https://www.youtube.com/watch?v=abc123") is True

    def test_valid_youtu_be(self):
        assert validate_youtube_url("https://youtu.be/abc123") is True

    def test_valid_without_www(self):
        assert validate_youtube_url("https://youtube.com/watch?v=abc123") is True

    def test_empty_string_is_valid(self):
        assert validate_youtube_url("") is True

    def test_non_youtube_url(self):
        assert validate_youtube_url("https://vimeo.com/123") is False

    def test_http_not_https(self):
        assert validate_youtube_url("http://youtube.com/watch?v=abc") is False


class TestValidateGeoguessrUrl:
    def test_valid_url(self):
        assert validate_geoguessr_url("https://www.geoguessr.com/challenge/abc123") is True

    def test_valid_without_www(self):
        assert validate_geoguessr_url("https://geoguessr.com/challenge/XYZ789") is True

    def test_not_challenge_path(self):
        assert validate_geoguessr_url("https://www.geoguessr.com/maps/abc123") is False

    def test_empty_string(self):
        assert validate_geoguessr_url("") is False

    def test_non_geoguessr(self):
        assert validate_geoguessr_url("https://example.com/challenge/abc") is False
