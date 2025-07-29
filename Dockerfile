FROM python:3.9-slim

WORKDIR /code

# Install system dependencies for PostgreSQL
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Create a non-root user
RUN useradd -m makeja_user && chown -R makeja_user:makeja_user /code
USER makeja_user

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
