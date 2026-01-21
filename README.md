Regium Innovations is a full-stack startup project developed to design, build, and deploy scalable digital solutions using modern web technologies. The platform represents a real-world product initiative, emphasizing clean architecture, secure backend systems, seamless third-party integrations, and a production-ready frontend experience.

This project was developed as part of an internship and startup initiative, closely following industry-standard software development practices such as environment-based configuration, authentication and authorization, cloud service integration, online payment processing, and live deployment.

🌐 Live Application: https://reguim-innovations.vercel.app

Project Overview

The objective of Regium Innovations is to establish a scalable foundation for delivering digital products and services. The project simulates real startup workflows, including product design, backend service development, frontend implementation, security considerations, and deployment in a production environment.

Key Features

Modern, responsive, and user-friendly interface

Secure authentication using JSON Web Tokens (JWT)

Cloud-based media storage and management

Integrated email services

Online payment gateway integration

Admin-level access control

Environment-based configuration for enhanced security

Production-ready deployment architecture

Technology Stack
Frontend

React (Vite)

Tailwind CSS

Firebase services

Razorpay integration

Backend

Node.js

Express.js

MongoDB

JWT Authentication

Cloudinary

Nodemailer

Razorpay API

Deployment & Infrastructure

Frontend: Vercel

Backend: Cloud-hosted server environment

Database: MongoDB Atlas

Project Structure
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── vite.config.js
│
└── README.md

Environment Variables
Backend Environment Variables (backend/.env)

Create a .env file in the backend directory and configure the following variables:

MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email_address
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
RAZORPAY_KEY_ID=your_razorpay_key_id
PORT=5000
NODE_ENV=production


Note: The .env file must not be committed to version control.

Frontend Environment Variables (frontend/.env)

Create a .env file in the frontend directory:

VITE_ADMIN_EMAIL=admin_email@example.com
VITE_FIREBASE_APIKEY=your_firebase_api_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id

Installation and Setup
Prerequisites

Node.js (version 16 or later)

npm or yarn package manager

MongoDB Atlas account

Razorpay account

Cloudinary account

Firebase project

Clone the Repository
git clone https://github.com/your-username/regium-innovations.git
cd regium-innovations

Backend Setup
cd backend
npm install
npm run dev


The backend server will run on:

http://localhost:5000

Frontend Setup
cd frontend
npm install
npm run dev


The frontend application will run on:

http://localhost:5173
