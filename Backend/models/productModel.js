import mongoose, { Types } from "mongoose";

const productModel = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type:String
        },
        category: {
            type: String,
        },
        price: {
            type: Number,
            required: true
        },
        photo: {
            url: String,
            public_id: String
        },
        productBuyer: {
             type: mongoose.Schema.Types.ObjectId,
             ref: "User"
        }
        
    }, {timestamps: true}
);

const Product = mongoose.model("Product", productModel);

export default Product;