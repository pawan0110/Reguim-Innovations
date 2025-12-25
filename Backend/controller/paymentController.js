import Razorpay from "razorpay";
import crypto from "crypto";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


export const createOrder = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    const options = {
      amount: product.price * 100, // paise
      currency: "INR",
      receipt: productId.toString(),
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error("Order creation error:", error.message);
    res.status(500).json({ message: "Order creation failed", error: error.message });
  }
};


export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      productId,
      userId,
    } = req.body;

    // Verify signature using HMAC SHA256
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    // Optionally fetch order to double-check status
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status !== "paid" && orderInfo.status !== "captured") {
      // Not paid yet
      return res.status(400).json({ message: "Order not paid" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Ensure productId isn't already present
    if (!user.myProduct || !user.myProduct.includes(productId)) {
      user.myProduct = user.myProduct || [];
      user.myProduct.push(productId);
      await user.save();
    }

    return res
      .status(200)
      .json({ message: "Payment verified" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error during payment verification" });
  }
};
