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
        data = resp.get_json()
        assert data["error_code"] == "NOT_FOUND"
        assert data["message"] == "Not found"

    def test_405_returns_json(self, client):
        resp = client.delete("/ping")
        assert resp.status_code == 405
        data = resp.get_json()
        assert data["error_code"] == "METHOD_NOT_ALLOWED"
        assert data["message"] == "Method not allowed"
