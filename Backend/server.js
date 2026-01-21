import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoutes.js";
import paymentRouter from "./routes/paymentRoute.js";

// 1. Load Environment Variables
dotenv.config();

// 2. Connect to Database
connectDB();

const app = express();


const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://reguim-innovations.vercel.app",
  "https://reguim-innovations.onrender.com"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      // allow this origin
      return callback(null, true);
    } else {
      console.warn("Blocked CORS origin:", origin);
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Origin"],
};

app.use(cors(corsOptions));

// Optional: request logging to show incoming origin (helps debug)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url} Origin:`, req.headers.origin || "no-origin");
  next();
});

app.get("/__env_check", (req, res) => {
  const checks = {
    MONGODB_URL: !!process.env.MONGODB_URL,
    JWT_SECRET: !!process.env.JWT_SECRET,
    EMAIL_USER: !!process.env.EMAIL_USER,
    CLOUDINARY_CLOUD_NAME: !!process.env.CLOUDINARY_CLOUD_NAME,
    RAZORPAY_KEY_ID: !!process.env.RAZORPAY_KEY_ID,
    PORT: !!process.env.PORT,
    NODE_ENV: process.env.NODE_ENV || null,
  };
  res.json(checks);
});

// 5. Standard Middlewares
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser()); 

// 6. Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use("/api/payment", paymentRouter);

// Test Route
app.get("/", (req, res) => {
  res.send("Regium Innovations Backend Server is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
🚀 Server is flying on port ${PORT}
🌍 Mode: ${process.env.NODE_ENV || 'development'}
  `);
});
