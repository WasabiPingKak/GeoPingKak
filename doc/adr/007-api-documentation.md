# ADR-007: API 文件採用 OpenAPI 3.0 + Swagger UI

## Status

Accepted

## Context

後端 API 需要文件化方案。候選包括手寫 Markdown、OpenAPI spec、GraphQL schema 等。

## Decision

採用 OpenAPI 3.0 spec 搭配 Swagger UI。

## Rationale

- 提供 `/api/docs/` 互動式文件，方便測試與驗證
- 提供 `/api/openapi.yaml` 機器可讀規格，支援自動化工具整合
- OpenAPI 為業界標準，生態工具豐富
