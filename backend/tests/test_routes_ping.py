"""Tests for /ping and global error handlers."""


class TestPing:
    def test_ping(self, client):
        resp = client.get("/ping")
        assert resp.status_code == 200
        assert resp.get_json() == {"message": "pong"}


class TestGlobalErrorHandlers:
    def test_404_returns_json(self, client):
        resp = client.get("/nonexistent-route")
        assert resp.status_code == 404
        assert resp.get_json()["error"] == "Not found"

    def test_405_returns_json(self, client):
        resp = client.delete("/ping")
        assert resp.status_code == 405
        assert resp.get_json()["error"] == "Method not allowed"
