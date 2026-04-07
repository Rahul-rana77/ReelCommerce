import express from 'express';
import { logoutUser, registerUser } from '../controllers/auth.controller.js';
import { loginUser } from '../controllers/auth.controller.js';
import { registerAdmin, loginAdmin, logoutAdmin } from '../controllers/admin.controller.js';

const router = express.Router();

router.route('/user/register').post(registerUser);
router.route('/user/login').post(loginUser);
router.route('/user/logout').post(logoutUser);

router.route('/admin/register').post(registerAdmin);
router.route('/admin/login').post(loginAdmin);
router.route('/admin/logout').post(logoutAdmin);


export default router;