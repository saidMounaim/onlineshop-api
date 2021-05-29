import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a name'],
		},

		email: {
			type: String,
			validate: [
				/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
				,
				'Please add a valid email',
			],
			unique: true,
		},

		password: {
			type: String,
			required: [true, 'Please add a password'],
		},

		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

UserSchema.pre('save', function (next) {
	if (!this.isModified('password')) {
		next();
	}

	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(this.password, salt);

	this.password = hash;

	next();
});

const User = mongoose.model('User', UserSchema);

export default User;
