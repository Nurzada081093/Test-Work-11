import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'User is required'],
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: [true, 'Category is required'],
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    price: {
        type: Number,
        min: 1,
        required: [true, 'Price is required'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
    }
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;