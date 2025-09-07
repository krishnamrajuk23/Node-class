import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    name: {type: String, required: true, minlength: 3, maxlength: 50},
    email: {type: String, required: true, unique: true, trim: true, lowercase: true},
    password: {type: String, required: true, minlength: 8},
    role:{
        type: String,
        enum: ['admin', 'user', 'seller'],
        default: 'user'
    },
    createdAt: {type: Date, default: Date.now}
}, {timestamps: true});

export const User = mongoose.model('User', userSchema);
