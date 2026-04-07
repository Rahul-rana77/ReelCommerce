import mongoose from 'mongoose';

const reelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    video:{
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true,
    }
}, { timestamps: true });

const reelModel = mongoose.model('Reel', reelSchema);

export default reelModel;