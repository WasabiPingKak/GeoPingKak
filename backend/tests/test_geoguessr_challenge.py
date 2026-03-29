from unittest.mock import MagicMock, patch

from services.geoguessr_challenge import MAX_RETRIES, create_challenge

MAP_ID = "world-theworld"


class TestCreateChallengeSuccess:
    @patch("services.geoguessr_challenge.NCFA_COOKIE", "valid-cookie")
    @patch("services.geoguessr_challenge.requests.post")
    def test_returns_challenge_url(self, mock_post):
        mock_resp = MagicMock()
        mock_resp.json.return_value = {"token": "abc123"}
        mock_post.return_value = mock_resp

        result = create_challenge(MAP_ID)
        assert result == "https://www.geoguessr.com/challenge/abc123"


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
        assert result == "https://www.geoguessr.com/challenge/retry-ok"
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
        assert result == "https://www.geoguessr.com/challenge/conn-ok"
        assert mock_post.call_count == 3

    @patch("services.geoguessr_challenge.NCFA_COOKIE", "valid-cookie")
    @patch("services.geoguessr_challenge.requests.post")
    def test_exhaust_retries_returns_none(self, mock_post):
        """重試耗盡仍失敗，回傳 None。"""
        import requests

        mock_post.side_effect = requests.exceptions.Timeout()

        result = create_challenge(MAP_ID)
        assert result is None
        assert mock_post.call_count == MAX_RETRIES


class TestCreateChallengeFailure:
    """所有失敗路徑都應回傳 None，不拋異常。"""

    @patch("services.geoguessr_challenge.NCFA_COOKIE", "")
    def test_ncfa_cookie_not_set(self):
        assert create_challenge(MAP_ID) is None

    @patch("services.geoguessr_challenge.NCFA_COOKIE", None)
    def test_ncfa_cookie_is_none(self):
        assert create_challenge(MAP_ID) is None

    @patch("services.geoguessr_challenge.NCFA_COOKIE", "valid-cookie")
    @patch("services.geoguessr_challenge.requests.post")
    def test_http_error(self, mock_post):
        """API 回傳 4xx/5xx（非 retryable，不重試）"""
        import requests

        mock_post.return_value.raise_for_status.side_effect = (
            requests.exceptions.HTTPError()
        )
        assert create_challenge(MAP_ID) is None

    @patch("services.geoguessr_challenge.NCFA_COOKIE", "valid-cookie")
    @patch("services.geoguessr_challenge.requests.post")
    def test_timeout_exhausted(self, mock_post):
        import requests

        mock_post.side_effect = requests.exceptions.Timeout()
        assert create_challenge(MAP_ID) is None

    @patch("services.geoguessr_challenge.NCFA_COOKIE", "valid-cookie")
    @patch("services.geoguessr_challenge.requests.post")
    def test_connection_error_exhausted(self, mock_post):
        import requests

        mock_post.side_effect = requests.exceptions.ConnectionError()
        assert create_challenge(MAP_ID) is None

    @patch("services.geoguessr_challenge.NCFA_COOKIE", "valid-cookie")
    @patch("services.geoguessr_challenge.requests.post")
    def test_response_missing_token(self, mock_post):
        """API 回 200 但 JSON 沒有 token"""
        mock_resp = MagicMock()
        mock_resp.json.return_value = {}
        mock_post.return_value = mock_resp
        assert create_challenge(MAP_ID) is None

    @patch("services.geoguessr_challenge.NCFA_COOKIE", "valid-cookie")
    @patch("services.geoguessr_challenge.requests.post")
    def test_response_not_json(self, mock_post):
        """API 回傳非 JSON 內容"""
        mock_resp = MagicMock()
        mock_resp.json.side_effect = ValueError("No JSON")
        mock_post.return_value = mock_resp
        assert create_challenge(MAP_ID) is None
