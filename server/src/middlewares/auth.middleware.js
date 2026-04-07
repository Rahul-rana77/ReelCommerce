import adminModel from '../models/admin.model.js';
import jwt from 'jsonwebtoken';

const authenticateAdminMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Please login first' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await adminModel.findById(decoded.id);
        if (!admin) {
            return res.status(401).json({ message: 'Admin not found' });
        }
        req.admin = admin;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};


export default authenticateAdminMiddleware;