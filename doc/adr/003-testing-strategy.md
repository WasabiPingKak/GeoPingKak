# ADR-003: 測試策略採用 Mock 單元測試 + Firestore Emulator 整合測試

## Status

Accepted

## Context

後端需要測試策略來確保程式碼品質。純 mock 測試速度快但無法驗證真實 Firestore 行為；純整合測試需要 emulator 環境且速度較慢。

## Decision

採用雙層測試策略：Mock 單元測試 + Firestore Emulator 整合測試。

## Rationale

- 單元測試使用 mock Firestore，CI 必跑，覆蓋率高
- 整合測試使用 Firestore Emulator，驗證真實資料庫行為
- 整合測試在 emulator 未啟動時自動 skip，不阻擋 CI pipeline
