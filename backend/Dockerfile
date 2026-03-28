FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1

RUN adduser --system --no-create-home appuser

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY --chown=appuser:appuser . .

USER appuser

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD ["python", "-c", "import urllib.request; urllib.request.urlopen('http://localhost:8080/ping')"]

CMD ["gunicorn", "-b", "0.0.0.0:8080", "-w", "2", "--threads", "2", "app:app"]
