import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    id: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
}, {timestamps: true});

export const User = mongoose.model('User', userSchema);