# ADR-002: 認證方式選用固定 Bearer Token

## Status

Accepted

## Context

Admin API（寫入端點）需要認證保護，防止未授權存取。候選方案包括 OAuth 2.0、JWT、固定 Bearer Token 等。

## Decision

使用固定 Bearer Token，由 GCP Secret Manager 管理。

## Rationale

- 單人操作 admin API，不需要多角色權限模型
- Token 由 GCP Secret Manager 集中管理，不進版控
- 驗證使用 `hmac.compare_digest` 防 timing attack
