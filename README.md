Regium Innovations is a full-stack startup project built using modern web technologies to deliver a scalable and production-ready web platform. The application follows industry-standard development practices and is deployed in a live production environment.
🌐 Live Application: https://reguim-innovations.vercel.app/

Key Features

Responsive user interface

Secure authentication

Payment gateway integration

Cloud-based media storage

Production-ready deployment

Technology Stack
Frontend

React (Vite)

Tailwind CSS

Firebase

Razorpay

Backend

Node.js

Express.js

MongoDB

JWT

Cloudinary

Nodemailer

Deployment

Frontend: Vercel

Backend: Cloud-hosted server

Database: MongoDB Atlas

Project Structure
├── backend/
├── frontend/
└── README.md

Environment Variables
Backend (backend/.env)
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email_address
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
RAZORPAY_KEY_ID=your_razorpay_key_id
PORT=5000
NODE_ENV=production

Frontend (frontend/.env)
VITE_ADMIN_EMAIL=admin_email@example.com
VITE_FIREBASE_APIKEY=your_firebase_api_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id

Installation
git clone https://github.com/your-username/regium-innovations.git
cd regium-innovations

Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev
