import express from 'express';
import {
	login,
	register,
	getMe,
	updateProfile,
	updatePassword,
	forgotPassword,
} from '../controllers/AuthController.js';
import ProtectMiddleware from '../middlewares/ProtectMiddleware.js';

const router = express.Router();

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/me').get(ProtectMiddleware, getMe);
router.route('/updateProfile').put(ProtectMiddleware, updateProfile);
router.route('/updatepassword').put(ProtectMiddleware, updatePassword);
router.route('/forgotpassword').post(forgotPassword);

export default router;
