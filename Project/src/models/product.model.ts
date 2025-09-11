import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    name: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    ratings: {type: [Number], default: []},
    tags: {type: [String], default: []},
}, {timestamps: true});

export const Product = mongoose.model('Product', productSchema);
