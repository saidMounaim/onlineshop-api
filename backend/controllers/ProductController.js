import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

//@DESC Get All Products
//@ROUTE /api/v1/products
//@METHOD GET
export const getAll = asyncHandler(async (req, res) => {
	const products = await Product.find({});

	res.status(201).json({ success: true, count: products.length, data: products });
});
