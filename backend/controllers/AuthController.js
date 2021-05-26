import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

//@DESC Login User
//@ROUTE /api/v1/auth/login
//@METHOD POST
export const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (!user) {
		res.status(404);
		throw new Error('Email or password incorrect');
	}

	const match = await bcrypt.compare(password, user.password);

	if (match) {
		res.status(201).json({
			success: true,
			data: {
				id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
			},
		});
	} else {
		res.status(401);
		throw new Error('password incorrect');
	}
});
