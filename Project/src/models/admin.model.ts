import mongoose, { Schema } from 'mongoose';

const adminSchema = new Schema({
    order: {type: String, required: true},
    orderId: {type: String, required: true},
    ProductId: {id: String, required: true},
    sellerDetails: {type: String, required: true},
    userDetails: {type: String, required: true},
}, {timestamps: true});

export const User = mongoose.model('User', adminSchema);
