from unittest.mock import MagicMock, patch

from services.geoguessr_challenge import (
    MAX_RETRIES,
    ChallengeFailure,
    create_challenge,
)

MAP_ID = "world-theworld"


class TestCreateChallengeSuccess:
    @patch("services.geoguessr_challenge.NCFA_COOKIE", "valid-cookie")
    @patch("services.geoguessr_challenge.requests.post")
    def test_returns_challenge_url(self, mock_post):
        mock_resp = MagicMock()
        mock_resp.json.return_value = {"token": "abc123"}
        mock_post.return_value = mock_resp

        result = create_challenge(MAP_ID)
        assert result.url == "https://www.geoguessr.com/challenge/abc123"
        assert result.failure is None


class TestCreateChallengeRetry:
    """網路瞬斷與 timeout 應自動重試，最終成功則回傳結果。"""

    @patch("services.geoguessr_challenge.NCFA_COOKIE", "valid-cookie")
    @patch("services.geoguessr_challenge.requests.post")
    def test_retry_on_timeout_then_succeed(self, mock_post):
        """第一次 timeout，第二次成功。"""
        import requests

        mock_resp = MagicMock()
        mock_resp.json.return_value = {"token": "retry-ok"}

        mock_post.side_effect = [requests.exceptions.Timeout(), mock_resp]

        result = create_challenge(MAP_ID)
        assert result.url == "https://www.geoguessr.com/challenge/retry-ok"
        assert result.failure is None
        assert result.retry_count == 1
        assert mock_post.call_count == 2

    @patch("services.geoguessr_challenge.NCFA_COOKIE", "valid-cookie")
    @patch("services.geoguessr_challenge.requests.post")
    def test_retry_on_connection_error_then_succeed(self, mock_post):
        """前兩次 ConnectionError，第三次成功。"""
        import requests

        mock_resp = MagicMock()
        mock_resp.json.return_value = {"token": "conn-ok"}

        mock_post.side_effect = [
            requests.exceptions.ConnectionError(),
            requests.exceptions.ConnectionError(),
            mock_resp,
        ]

        result = create_challenge(MAP_ID)
        assert result.url == "https://www.geoguessr.com/challenge/conn-ok"
        assert result.failure is None
        assert result.retry_count == 2
        assert mock_post.call_count == 3

    @patch("services.geoguessr_challenge.NCFA_COOKIE", "valid-cookie")
    @patch("services.geoguessr_challenge.requests.post")
    def test_exhaust_retries_returns_timeout(self, mock_post):
        """重試耗盡仍失敗，回傳 TIMEOUT failure。"""
        import requests

        mock_post.side_effect = requests.exceptions.Timeout()

        result = create_challenge(MAP_ID)
        assert result.url is None
        assert result.failure == ChallengeFailure.TIMEOUT
        assert result.retry_count == MAX_RETRIES - 1
        assert mock_post.call_count == MAX_RETRIES


class TestCreateChallengeFailure:
    """所有失敗路徑都應回傳對應的 ChallengeFailure，不拋異常。"""

    @patch("services.geoguessr_challenge.NCFA_COOKIE", "")
    def test_ncfa_cookie_not_set(self):
        result = create_challenge(MAP_ID)
        assert result.url is None
        assert result.failure == ChallengeFailure.MISSING_TOKEN_ENV

    @patch("services.geoguessr_challenge.NCFA_COOKIE", None)
    def test_ncfa_cookie_is_none(self):
        result = create_challenge(MAP_ID)
        assert result.url is None
        assert result.failure == ChallengeFailure.MISSING_TOKEN_ENV

    @patch("services.geoguessr_challenge.NCFA_COOKIE", "valid-cookie")
    @patch("services.geoguessr_challenge.requests.post")
    def test_http_4xx_error(self, mock_post):
        """API 回傳 4xx"""
        import requests

        mock_response = MagicMock()
        mock_response.status_code = 403
        mock_post.return_value.raise_for_status.side_effect = requests.exceptions.HTTPError(response=mock_response)

        result = create_challenge(MAP_ID)
        assert result.url is None
        assert result.failure == ChallengeFailure.HTTP_4XX
        assert result.status_code == 403

    @patch("services.geoguessr_challenge.NCFA_COOKIE", "valid-cookie")
    @patch("services.geoguessr_challenge.requests.post")
    def test_http_5xx_error(self, mock_post):
        """API 回傳 5xx"""
        import requests

        mock_response = MagicMock()
        mock_response.status_code = 500
        mock_post.return_value.raise_for_status.side_effect = requests.exceptions.HTTPError(response=mock_response)

        result = create_challenge(MAP_ID)
        assert result.url is None
        assert result.failure == ChallengeFailure.HTTP_5XX
        assert result.status_code == 500

    @patch("services.geoguessr_challenge.NCFA_COOKIE", "valid-cookie")
    @patch("services.geoguessr_challenge.requests.post")
    def test_timeout_exhausted(self, mock_post):
        import requests

        mock_post.side_effect = requests.exceptions.Timeout()

        result = create_challenge(MAP_ID)
        assert result.url is None
        assert result.failure == ChallengeFailure.TIMEOUT

    @patch("services.geoguessr_challenge.NCFA_COOKIE", "valid-cookie")
    @patch("services.geoguessr_challenge.requests.post")
    def test_connection_error_exhausted(self, mock_post):
        import requests

        mock_post.side_effect = requests.exceptions.ConnectionError()

        result = create_challenge(MAP_ID)
        assert result.url is None
        assert result.failure == ChallengeFailure.CONNECTION_ERROR

    @patch("services.geoguessr_challenge.NCFA_COOKIE", "valid-cookie")
    @patch("services.geoguessr_challenge.requests.post")
    def test_response_missing_token(self, mock_post):
        """API 回 200 但 JSON 沒有 token"""
        mock_resp = MagicMock()
        mock_resp.json.return_value = {}
        mock_post.return_value = mock_resp

        result = create_challenge(MAP_ID)
        assert result.url is None
        assert result.failure == ChallengeFailure.MISSING_TOKEN

    @patch("services.geoguessr_challenge.NCFA_COOKIE", "valid-cookie")
    @patch("services.geoguessr_challenge.requests.post")
    def test_response_not_json(self, mock_post):
        """API 回傳非 JSON 內容"""
        mock_resp = MagicMock()
        mock_resp.json.side_effect = ValueError("No JSON")
        mock_post.return_value = mock_resp

        result = create_challenge(MAP_ID)
        assert result.url is None
        assert result.failure == ChallengeFailure.INVALID_JSON
