# Task Manager Web App (Backend)

## 📌 Description
This is the backend API for the Task Manager Web Application.  
It handles authentication, task management, and user operations.

## 🚀 Live API
https://taskmanagerweb-production.up.railway.app

## 🛠 Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

## ✨ Features
- User Authentication (Register / Login / Logout)
- JWT-based Authorization
- Task CRUD (Create, Read, Update, Delete)
- Password Reset (Token-based)
- Email Verification (optional)
- Protected Routes

## 📂 API Endpoints

### Auth Routes
POST   /api/users/register
POST   /api/users/login
GET    /api/users/login-status
POST   /api/users/forgot-password
POST   /api/users/reset-password/:resetPasswordToken

### User Routes
GET    /api/users/user
PATCH  /api/users/user

# Task Routes
GET    /api/tasks
POST   /api/tasks
PATCH  /api/tasks/:id
DELETE /api/tasks/:id

### Setup Instructions

git clone https://github.com/charithgaya/task-manager-backend.git
cd task-manager-backend
npm install
npm start

#### R.A. Charith Gayashan Deshapriya - Skyrek Full Stack Batch 06 - Reg.No. : FSDC6642