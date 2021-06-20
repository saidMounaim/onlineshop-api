import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a name'],
		},

		image: {
			type: String,
			required: [true, 'Please add a image'],
		},

		description: {
			type: String,
			required: [true, 'Please add a description'],
		},

		brand: {
			type: String,
			required: [true, 'Please add a brand'],
		},

		category: {
			type: String,
			required: [true, 'Please add a category'],
			enum: ['Electronics'],
		},

		price: {
			type: Number,
			required: [true, 'Please add a price'],
		},

		countInStock: {
			type: Number,
			required: [true, 'Please add a count in stock'],
		},
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model('Product', ProductSchema);

export default Product;
