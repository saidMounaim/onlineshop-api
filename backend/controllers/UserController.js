import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

//@DESC Get All Users
//@ROUTE /api/v1/users
//@METHOD GET
export const getAll = asyncHandler(async (req, res) => {
	const users = await User.find({});
	res.status(201).json({ success: true, count: users.length, data: users });
});

//@DESC Get Single User
//@ROUTE /api/v1/users/:id
//@METHOD GET
export const getUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}

	res.status(201).json({ success: true, data: user });
});

//@DESC Add User
//@ROUTE /api/v1/users
//@METHOD POST
export const addUser = asyncHandler(async (req, res) => {
	const user = await User.create(req.body);

	res.status(201).json({ success: true, data: user });
});

//@DESC Update User
//@ROUTE /api/v1/users/:id
//@METHOD PUT
export const updateUser = asyncHandler(async (req, res) => {
	let user = await User.findById(req.params.id);

	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}
	
	if (req.user.id !== user._id.toString()) {
	  res.status(401);
	  throw new Error("User not authrized");
	}

	user = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(201).json({ success: true, data: user });
});

//@DESC Delete User
//@ROUTE /api/v1/users/:id
//@METHOD DELETE
export const deleteUser = asyncHandler(async (req, res) => {
	let user = await User.findById(req.params.id);

	if (!user) {
	   res.status(404);
	   throw new Error('User not found');
	}

	if (req.user.id !== user._id.toString()) {
	  res.status(401);
	  throw new Error("User not authrized");
	}
	
	await user.delete();

	res.status(201).json({ success: true, data: {} });
});
