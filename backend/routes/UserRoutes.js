import express from 'express';
import { getAll, addUser } from '../controllers/UserController.js';

const router = express.Router();

router.route('/').get(getAll).post(addUser);

export default router;
