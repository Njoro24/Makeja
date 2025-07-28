import sys
import os

# Ensure app is in path
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from app.db import SessionLocal, engine
from app.models import Base, User

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

# Start session
session = SessionLocal()

# Sample data
users = [
    User(name="Alice", email="alice@example.com"),
    User(name="Bob", email="bob@example.com"),
    User(name="Charlie", email="charlie@example.com"),
]

# Insert data
session.add_all(users)

try:
    session.commit()
    print(" Seed data inserted successfully.")
except Exception as e:
    print("Failed to seed data:", e)
    session.rollback()
finally:
    session.close()
