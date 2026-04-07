import express from 'express';
const router = express.Router();
import multer from 'multer';
import { createReel } from '../controllers/reel.controller.js';
import authenticateAdminMiddleware from '../middlewares/auth.middleware.js';
import { getReel } from '../controllers/reel.controller.js';

const upload = multer({
    storage: multer.memoryStorage(),
});

router.route('/')
    .post(
        authenticateAdminMiddleware,
        upload.single('video'),
        createReel
    );

router.route('/').get(authenticateAdminMiddleware, getReel);



export default router;