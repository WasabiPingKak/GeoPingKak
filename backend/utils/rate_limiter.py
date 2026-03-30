import os

from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

# NOTE: Default storage is in-memory ("memory://"), which means each Cloud Run
# instance maintains its own independent counter. Under horizontal scaling this
# results in per-instance (not global) rate limiting. For strict global limiting,
# set RATE_LIMIT_STORAGE_URL to a shared backend such as Redis
# (e.g. "redis://host:6379"). The current default is an intentional trade-off:
# acceptable for low-traffic services, avoids an extra Redis dependency.
limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["60 per minute"],
    storage_uri=os.getenv("RATE_LIMIT_STORAGE_URL", "memory://"),
)
