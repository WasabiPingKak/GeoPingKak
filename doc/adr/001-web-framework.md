# ADR-001: Web 框架選用 Flask（同步）

## Status

Accepted

## Context

後端需要一個 Python Web 框架來提供 REST API。候選包括 Flask（同步）、FastAPI / Starlette（async）等。

## Decision

選用 Flask（同步模式）。

## Rationale

- Firestore SDK 為同步 API，使用 async 框架無效能優勢
- 本站以 CRUD 為主，不需要 WebSocket 或長連線
- Flask 生態成熟，Cloud Run 部署簡單
