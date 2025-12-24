import express from "express";
import upload from "../middlewares/multer.js";
import {
    addproduct,
    getAllProduct,
    deleteProduct
} from "../controller/productController.js"

const productRouter = express.Router();

productRouter.post("/addProduct", upload.single("photo"), addproduct);
productRouter.get("/getallproduct", getAllProduct);
productRouter.delete("/:productId", deleteProduct);

export default productRouter;