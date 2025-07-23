from app import db
from models import Hostel

def seed():
    db.session.add(Hostel(name="Purple Haven", location="Nairobi"))
    db.session.add(Hostel(name="White Orchid", location="Thika"))
    db.session.commit()
    print(" Seed data added!")

if __name__ == "__main__":
    seed()
