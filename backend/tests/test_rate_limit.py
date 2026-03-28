"""Rate limiting tests."""


def test_ping_returns_429_after_exceeding_limit(client_with_rate_limit):
    """Global default limit (60/min) should return 429 when exceeded."""
    for _ in range(60):
        resp = client_with_rate_limit.get("/ping")
        assert resp.status_code == 200

    resp = client_with_rate_limit.get("/ping")
    assert resp.status_code == 429
