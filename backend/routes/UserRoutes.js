import express from 'express';
import { getAll, addUser, updateUser } from '../controllers/UserController.js';

const router = express.Router();

router.route('/').get(getAll).post(addUser);
router.route('/:id').put(updateUser);

export default router;
