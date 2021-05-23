import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

//@DESC Get All Users
//@ROUTE /api/v1/users
//@METHOD GET
export const getAll = asyncHandler(async (req, res) => {
	const users = await User.find({});
	res.status(201).json({ success: true, count: users.length, data: users });
});

//@DESC Add User
//@ROUTE /api/v1/users
//@METHOD POST
export const addUser = asyncHandler(async (req, res) => {
	const user = await User.create(req.body);

	res.status(201).json({ success: true, data: user });
});
