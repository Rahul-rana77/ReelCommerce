import adminModel from '../models/admin.model.js';
import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const authenticateMiddleware = async (req, res, next) => {
    try {
        if(adminToken) {
            const adminToken = req.cookies.adminToken;
            if (!adminToken) {
                return res.status(401).json({ message: 'Please login first' });
            }
            const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
            const admin = await adminModel.findById(decoded.id);
            if (!admin) {
                return res.status(401).json({ message: 'Admin not found' });
            }
            req.admin = admin;
            next();
        }
        if(token){
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({ message: 'Please login first' });
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await userModel.findById(decoded.id);
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }
            req.user = user;
            next();
        }
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ message: error.message });
    }
};


export default authenticateMiddleware;