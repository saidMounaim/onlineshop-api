import express from 'express';
import { getAll, getUser, addUser, updateUser, deleteUser } from '../controllers/UserController.js';

const router = express.Router();

router.route('/').get(getAll).post(addUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

export default router;
