# ADR-006: 監控採用 Structured Logging，暫不設 Alerting

## Status

Accepted

## Context

後端需要可觀測性機制來排查問題。候選方案從基本 logging 到完整的 APM + alerting 都有。

## Decision

採用 structured JSON logging + request ID，暫不設定 alerting policy。

## Rationale

- 已具備 JSON logging + request ID + Cloud Logging 查詢能力，足以排查問題
- 個人專案無 on-call 需求，alerting 的維護成本大於效益
- 未來流量成長時可疊加 alerting，不影響現有架構
