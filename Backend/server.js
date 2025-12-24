import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoute.js";

// 1. Load Environment Variables
dotenv.config();

// 2. Connect to Database
connectDB();

const app = express();

// 3. CORS Configuration

const allowedOrigins = [
  "http://localhost:5173", 
  "http://localhost:5174", 
   
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));




// 5. Standard Middlewares
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data
app.use(cookieParser()); // Allows server to read/set cookies

// 6. Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter)

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