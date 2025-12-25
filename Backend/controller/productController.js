import uploadOnCloudinary from "../config/cloudinary.js";
import Product from "../models/productModel.js";
import {v2 as cloudinary} from "cloudinary";

export const addproduct = async (req, res) => {
  try {
    const { name, description, category, price } = req.body;
    let photo = null;
    if (req.file) {
      photo = await uploadOnCloudinary(req.file.path);
    }
    if (
      !name || !price ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
     if (price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be greater than 0",
      });
    }
    const product = await Product.create({
      name,
      description,
      category,
      price,
      photo,
    });
    return res.status(201).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to add product: ${error.message || error} ` });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      total: products.length,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get products",
      error: error.message,
    });
  }
};


export const deleteProduct = async (req, res) => {
    try {
        const {productId} = req.params;
        const product = await Product.findById(productId);

        if(!product) {
            return res.status(404).json({message: "product not found"});
        }

        if(product.photo?.public_id) {
            await cloudinary.uploader.destroy(product.photo.public_id);
        }

        await product.deleteOne()
        
        return res.status(200).json({message: "successfully product deleted"});
    } catch (error) {
        return res.status(500).json({message: `Failed to remove course: ${error.message || error}`});
    }
}