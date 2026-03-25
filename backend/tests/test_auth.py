from auth import extract_bearer_token, verify_bearer_token


# --- extract_bearer_token ---

class TestExtractBearerToken:
    def test_valid_header(self):
        assert extract_bearer_token("Bearer my-token") == "my-token"

    def test_empty_string(self):
        assert extract_bearer_token("") is None

    def test_missing_bearer_prefix(self):
        assert extract_bearer_token("Basic my-token") is None

    def test_bearer_without_token(self):
        """'Bearer ' 後面沒有值，應回傳空字串（格式合法但 token 為空）"""
        assert extract_bearer_token("Bearer ") == ""

    def test_bearer_lowercase(self):
        """bearer 小寫不合法"""
        assert extract_bearer_token("bearer my-token") is None

    def test_token_with_special_chars(self):
        """token 含特殊字元應原樣提取"""
        assert extract_bearer_token("Bearer abc+/=123@") == "abc+/=123@"


# --- verify_bearer_token ---

class TestVerifyBearerToken:
    def test_valid_token(self):
        assert verify_bearer_token("Bearer correct-token", "correct-token") is True

    def test_wrong_token(self):
        assert verify_bearer_token("Bearer wrong-token", "correct-token") is False

    def test_empty_header(self):
        assert verify_bearer_token("", "correct-token") is False

    def test_missing_bearer_prefix(self):
        assert verify_bearer_token("Basic correct-token", "correct-token") is False

    def test_expected_token_empty(self):
        """伺服器端 token 未設定時，任何請求都應被拒絕"""
        assert verify_bearer_token("Bearer any-token", "") is False

    def test_bearer_without_token_value(self):
        """header 有 'Bearer ' 但沒有 token 值"""
        assert verify_bearer_token("Bearer ", "correct-token") is False

    def test_both_empty(self):
        """header 和 expected 都為空"""
        assert verify_bearer_token("", "") is False
