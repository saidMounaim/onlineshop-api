import express from 'express';
import { getAll, addProduct, updateProduct, deleteProduct } from '../controllers/ProductController.js';
import ProtectMiddleware from '../middlewares/ProtectMiddleware.js';

const router = express.Router();

router.route('/').get(getAll).post(ProtectMiddleware, addProduct);
router.route('/:id').put(ProtectMiddleware, updateProduct).delete(ProtectMiddleware, deleteProduct);

export default router;
