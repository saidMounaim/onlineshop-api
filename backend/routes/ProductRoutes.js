import express from 'express';
import { getAll, addProduct } from '../controllers/ProductController.js';

const router = express.Router();

router.route('/').get(getAll).post(addProduct);

export default router;
