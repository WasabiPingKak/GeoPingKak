# ADR-004: Rate Limiter 預設 In-memory，可切換 Redis

## Status

Accepted

## Context

API 需要 rate limiting 防止濫用。Storage backend 選擇影響部署複雜度與擴展性。候選包括 in-memory、Redis、Firestore 等。

## Decision

預設使用 in-memory storage，透過環境變數 `RATE_LIMIT_STORAGE_URL` 預留 Redis 切換能力。

## Rationale

- 目前流量低，單 instance 即可應付
- In-memory 無外部依賴，部署簡單
- 已透過環境變數預留 Redis 切換，零程式碼修改即可擴展
