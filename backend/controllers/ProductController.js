import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

//@DESC Get All Products
//@ROUTE /api/v1/products
//@METHOD GET
export const getAll = asyncHandler(async (req, res) => {
	const products = await Product.find({});

	res.status(201).json({ success: true, count: products.length, data: products });
});

//@DESC Add Product
//@ROUTE /api/v1/products
//@METHOD POST
export const addProduct = asyncHandler(async (req, res) => {
	if (!req.files) {
		res.status(401).json({ success: false, message: 'No file uploaded' });
	} else {
		if (!req.files.image.mimetype.startsWith('image')) {
			res.status(401);
			throw new Error('Please add image file');
		}

		if (!req.files.image.size > process.env.FILE_UPLOAD_LIMIT) {
			res.status(401);
			throw new Error(`Please add a image less than ${process.env.FILE_UPLOAD_LIMIT}`);
		}

		let image = req.files.image;

		const { name, description, brand, category, price, countInStock } = req.body;

		image.mv(`${process.env.FILE_UPLOAD_PATH}/${image.name}`, async (err) => {
			if (err) {
				res.status(401);
				throw new Error(err);
			}

			const products = await Product.create({
				name,
				image: image.name,
				description,
				brand,
				category,
				price,
				countInStock,
			});

			res.status(201).json({ success: true, data: products });
		});
	}
});
