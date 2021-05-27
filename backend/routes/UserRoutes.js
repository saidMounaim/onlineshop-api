import express from 'express';
import { getAll, getUser, addUser, updateUser, deleteUser } from '../controllers/UserController.js';
import ProtectMiddleware from '../middlewares/ProtectMiddleware.js';

const router = express.Router();

router.route('/').get(getAll).post(ProtectMiddleware, addUser);
router.route('/:id').get(getUser).put(ProtectMiddleware, updateUser).delete(ProtectMiddleware, deleteUser);

export default router;
