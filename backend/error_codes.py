"""Standardized error codes and response helper for consistent API error responses."""

from enum import Enum

from flask import jsonify


class ErrorCode(str, Enum):
    """Machine-readable error codes for API consumers."""

    # Authentication / Authorization
    UNAUTHORIZED = "UNAUTHORIZED"

    # Validation
    INVALID_FORMAT = "INVALID_FORMAT"
    MISSING_FIELD = "MISSING_FIELD"
    INVALID_FIELD = "INVALID_FIELD"

    # Resource
    NOT_FOUND = "NOT_FOUND"

    # Rate limiting
    RATE_LIMITED = "RATE_LIMITED"

    # Server
    INTERNAL_ERROR = "INTERNAL_ERROR"
    UPSTREAM_FAILURE = "UPSTREAM_FAILURE"

    # Method
    METHOD_NOT_ALLOWED = "METHOD_NOT_ALLOWED"


def json_error(status_code, error_code: ErrorCode, message: str):
    """Return a standardized JSON error response.

    Response format:
        {
            "error_code": "INVALID_FORMAT",
            "error": "Bad Request",
            "message": "Invalid month format, expected YYYY-MM"
        }
    """
    status_labels = {
        400: "Bad Request",
        401: "Unauthorized",
        404: "Not Found",
        405: "Method Not Allowed",
        429: "Too Many Requests",
        500: "Internal Server Error",
        502: "Bad Gateway",
    }
    return (
        jsonify(
            {
                "error_code": error_code.value,
                "error": status_labels.get(status_code, "Error"),
                "message": message,
            }
        ),
        status_code,
    )
