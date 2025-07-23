import os

os.system("docker-compose down")
os.system("docker-compose build")
os.system("docker-compose up -d")

print("🚀 Deployed with Docker!")
