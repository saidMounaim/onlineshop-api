import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js';

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
				token: generateToken(user._id),
			},
		});
	} else {
		res.status(401);
		throw new Error('password incorrect');
	}
});

//@DESC Register User
//@ROUTE /api/v1/auth/register
//@METHOD POST
export const register = asyncHandler(async (req, res) => {
	const userExist = await User.findOne({ email: req.body.email });

	if (userExist) {
		res.status(401);
		throw new Error('User already exists');
	}

	const user = await User.create(req.body);

	res.status(201).json({
		success: true,
		data: {
			id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		},
	});
});
