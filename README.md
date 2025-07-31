Hostel Booking System

A modern, full-stack hostel booking platform built with React and Flask, designed to connect students with quality accommodation.

Table of Contents

Features
Tech Stack
Quick Start
Installation
Configuration
API Documentation
Team
Contributing
Support

Features

User Authentication - Secure login/register with JWT tokens
Hostel Search - Advanced filtering by location, price, and amenities
Room Booking - Real-time availability and booking management
Payment Integration - Multiple payment methods (Card, M-Pesa, Bank Transfer)
Review System - User reviews and ratings for hostels
Admin Dashboard - Comprehensive management tools
Responsive Design - Mobile-first responsive interface

Tech Stack
Backend

Python - Flask framework
PostgreSQL - Primary database
SQLAlchemy - ORM
Alembic - Database migrations
JWT - Authentication

Frontend

React - UI framework
Tailwind CSS - Styling
Context API - State management
Axios - API client

Quick Start
Prerequisites

Python 3.9+
Node.js 16+
PostgreSQL 13+

Clone Repository
bashgit clone https://github.com/yourusername/hostel-booking-system.git
cd hostel-booking-system

Installation
Backend Setup

Create virtual environment

bashcd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

Install dependencies

bashpip install -r requirements.txt

Setup database

bash# Create PostgreSQL database
createdb hostel_booking

# Run migrations
flask db upgrade

Seed database (optional)

bashpython scripts/seed_data.py

Start backend server

bashflask run
# Server runs on 'https://makeja-csu3.vercel.app/'
Frontend Setup

Install dependencies

bashcd frontend
npm install

Start development server

bashnpm start
# Server runs 'https://makejabe-2.onrender.com'
Configuration
Environment Variables
Create .env files in both backend and frontend directories:
Backend (.env)
envFLASK_APP=app.py
FLASK_ENV=development
DATABASE_URL=postgresql://username:password@localhost/hostel_booking
JWT_SECRET_KEY=your-secret-key-here
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=hello@makeja.com
MAIL_PASSWORD=your-app-password
Frontend (.env)
envREACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENVIRONMENT=development

API Documentation
Authentication Endpoints
POST /api/auth/register    - User registration
POST /api/auth/login       - User login
POST /api/auth/refresh     - Refresh JWT token
POST /api/auth/logout      - User logout
Hostel Endpoints
GET    /api/hostels        - List all hostels
GET    /api/hostels/:id    - Get hostel details
POST   /api/hostels        - Create hostel (Owner only)
PUT    /api/hostels/:id    - Update hostel (Owner only)
DELETE /api/hostels/:id    - Delete hostel (Owner only)
Booking Endpoints
GET    /api/bookings       - User's bookings
POST   /api/bookings       - Create booking
GET    /api/bookings/:id   - Booking details
PUT    /api/bookings/:id   - Update booking
DELETE /api/bookings/:id   - Cancel booking
For complete API documentation, visit: http://localhost:5000/api/docs

Team
This project is developed by a collaborative team:

 Meshack - Authentication & User Management
 Fancy - Payments & Hostel Management
 Darwin - Booking Logic & Business Rules
 Marvin - Reviews & Admin Dashboard
 Duncan - Middleware & Utilities
 Ian - Testing, Scripts & DevOps

 Database Schema
View our interactive database documentation: Database Schema

Testing

Backend Tests
bashcd backend
pytest tests/ -v
Frontend Tests
bashcd frontend
npm test
End-to-End Tests
bashnpm run test:e2e

Contributing

Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

Development Guidelines

Follow PEP 8 for Python code
Use ESLint and Prettier for JavaScript
Write tests for new features
Update documentation as needed

Issues & Support

Bug Reports: GitHub Issues
Feature Requests: GitHub Discussions
Email Support: hello@makeja.com

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments

React community for excellent documentation
Flask community for robust framework
All contributors who helped shape this project



For more information, visit our website or contact us at hello@makeja.com