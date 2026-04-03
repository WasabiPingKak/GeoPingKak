# ADR-005: 資料寫入採用單 Document 操作

## Status

Accepted

## Context

每日挑戰等資料寫入需要考慮原子性。候選方案包括 batch write、transaction、單 document 操作等。

## Decision

採用單 document 操作，不使用 batch write。

## Rationale

- 資料模型設計為每月一個 document，每次 API 呼叫只涉及單一 document
- 單 document 寫入天然具備原子性，不需要額外的 batch 或 transaction 機制
- 降低程式碼複雜度與 Firestore 操作成本
