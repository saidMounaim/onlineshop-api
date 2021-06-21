import express from 'express';
import { getAll, addProduct, updateProduct, deleteProduct } from '../controllers/ProductController.js';

const router = express.Router();

router.route('/').get(getAll).post(addProduct);
router.route('/:id').put(updateProduct).delete(deleteProduct);

export default router;
