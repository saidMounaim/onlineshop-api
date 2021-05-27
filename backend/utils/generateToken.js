import jwt from 'jsonwebtoken';

const generateToken = (id) => {
	const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '10h' });

	return token;
};

export default generateToken;
