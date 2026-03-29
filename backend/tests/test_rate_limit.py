"""Rate limiting tests."""


def test_ping_returns_429_after_exceeding_limit(client_with_rate_limit):
    """Global default limit (60/min) should return 429 when exceeded."""
    for _ in range(60):
        resp = client_with_rate_limit.get("/ping")
        assert resp.status_code == 200

    resp = client_with_rate_limit.get("/ping")
    assert resp.status_code == 429


def test_xff_distinguishes_clients(client_with_rate_limit):
    """Different X-Forwarded-For IPs should have independent rate limits."""
    # Exhaust limit for IP-A
    for _ in range(60):
        client_with_rate_limit.get("/ping", headers={"X-Forwarded-For": "1.1.1.1"})

    # IP-A should be blocked
    resp = client_with_rate_limit.get("/ping", headers={"X-Forwarded-For": "1.1.1.1"})
    assert resp.status_code == 429

    # IP-B should still be allowed
    resp = client_with_rate_limit.get("/ping", headers={"X-Forwarded-For": "2.2.2.2"})
    assert resp.status_code == 200
