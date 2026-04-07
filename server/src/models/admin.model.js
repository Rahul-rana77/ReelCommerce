import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: true
    },
    contactName: {
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
}, { timestamps: true });

const adminModel = mongoose.model('Admin', adminSchema);

export default adminModel;