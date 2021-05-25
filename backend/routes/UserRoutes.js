import express from 'express';
import { getAll, getUser, addUser, updateUser } from '../controllers/UserController.js';

const router = express.Router();

router.route('/').get(getAll).post(addUser);
router.route('/:id').get(getUser).put(updateUser);

export default router;
