import express from 'express';
import { getAll, addProduct, updateProduct } from '../controllers/ProductController.js';

const router = express.Router();

router.route('/').get(getAll).post(addProduct);
router.route('/:id').put(updateProduct);

export default router;
