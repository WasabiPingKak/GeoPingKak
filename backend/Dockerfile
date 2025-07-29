# 使用輕量級 Python 映像
FROM python:3.11-slim

# 設定工作目錄
WORKDIR /app

# 複製檔案並安裝依賴
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# 使用 gunicorn 作為伺服器
CMD ["gunicorn", "-b", "0.0.0.0:8080", "app:app"]
