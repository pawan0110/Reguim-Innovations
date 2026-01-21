Regium Innovations

Regium Innovations is a full-stack startup project developed to design, build, and deploy scalable digital solutions using modern web technologies. The platform represents a real-world product initiative, focusing on clean architecture, secure backend systems, and a production-ready frontend experience.

This project was created as part of an internship and startup exploration, simulating industry-level development workflows such as environment-based configuration, authentication, cloud integrations, payment processing, and live deployment.

🌐 Live Website: https://reguim-innovations.vercel.app, and cloud deployment.

Key Features

Responsive and modern UI

Secure authentication using JWT

Cloud-based image/media storage

Email service integration

Online payment gateway integration

Admin-level access control

Production-ready deployment

Environment-based configuration for security

Tech Stack
Frontend

React / Vite

Tailwind CSS

Firebase (authentication/services)

Razorpay (payments)

Backend

Node.js

Express.js

MongoDB

JWT Authentication

Cloudinary

Nodemailer

Razorpay API

Deployment

Frontend: Vercel

Backend: Cloud / Server environment

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
Backend Environment Variables (.env)

Create a .env file inside the backend directory and add the following:

MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email_address
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
RAZORPAY_KEY_ID=your_razorpay_key_id
PORT=5000
NODE_ENV=production


⚠️ Do not commit the .env file to GitHub.

Frontend Environment Variables (.env)

Create a .env file inside the frontend directory:

VITE_ADMIN_EMAIL=admin_email@example.com
VITE_FIREBASE_APIKEY=your_firebase_api_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id

Installation & Setup
Prerequisites

Node.js (v16+)

npm or yarn

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


Backend will run on:

http://localhost:5000

Frontend Setup
cd frontend
npm install
npm run dev


Frontend will run on:

http://localhost:5173
