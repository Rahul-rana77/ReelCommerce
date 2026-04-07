import reelModel from '../models/reel.model.js';
import { uploadFile } from '../services/storage.service.js';
import { v4 as uuidv4 } from 'uuid';

const createReel = async (req, res) => {

    const videoUrl = await uploadFile(req.file.buffer, uuidv4());

    const reel = await reelModel.create({
        author: req.admin._id,
        title: req.body.title,
        description: req.body.description,
        video: videoUrl.url,
    });

    res.status(201).json({
        message: 'Reel created successfully',
        reel,
    });
};

const getReel = async (req, res) => {
    const reel = await reelModel.find({});
    res.status(200).json({
        response: 'Reel fetched successfully',
        reel,
    });
}

export { createReel, getReel };