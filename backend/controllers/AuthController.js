import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import generateToken from '../utils/generateToken.js';
import sendMailer from '../utils/sendMail.js';

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

//@DESC Update User Profile
//@ROUTE /api/v1/auth/updateprofile
//@METHOD PUT
export const updateProfile = asyncHandler(async (req, res) => {
	let user = await User.findById(req.user.id);

	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}

	const updateData = {
		name: req.body.name,
		email: req.body.email,
	};

	user = await User.findByIdAndUpdate(req.user.id, updateData, {
		new: true,
		runValidators: true,
	});

	res.status(201).json({ success: true, data: user });
});

//@DESC Update Password
//@ROUTE /api/v1/auth/updatepassword
//@METHOD PUT
export const updatePassword = asyncHandler(async (req, res) => {
	const { oldPassword, newPassword } = req.body;

	if (oldPassword !== newPassword) {
		let user = await User.findById(req.user.id);

		if (!user) {
			res.status(404);
			throw new Error('User not found');
		}

		const match = bcrypt.compareSync(oldPassword, user.password);

		if (!match) {
			res.status(401);
			throw new Error('Old password incorrect');
		}

		user.password = newPassword;
		await user.save();

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
	}
});

//@DESC Get Me
//@ROUTE /api/v1/auth/me
//@METHOD GET
export const getMe = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id);
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

//@DESC Forgot Password
//@ROUTE /api/v1/auth/forgotpassword
//@METHOD POST
export const forgotPassword = asyncHandler(async (req, res) => {
	const resetToken = crypto.randomBytes(20).toString('hex');
	const hash = crypto.createHash('sha256').update(resetToken).digest('hex');

	let user = await User.findOne({ email: req.body.email });

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${hash}`;

	const subject = 'Forgor Password';
	const to = req.body.email;
	const message = `
		you requested to reset your password,<br /> 
		please check the link below to reset your password<br />
		<a href="${resetUrl}" target="_blank" >Reset Password</a>
	`;

	user.resetPasswordToken = hash;
	user.expiredPasswordToken = new Date().setHours(new Date().getHours() + 1);

	await user.save();

	try {
		sendMailer({ to, subject, message });

		res.status(201).json({ success: true, message: 'check your email' });
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.expiredPasswordToken = undefined;
		await user.save({ validateBeforeSave: false });

		res.status(401);
		throw new Error(error.message);
	}
});
