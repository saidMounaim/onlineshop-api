import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});
		console.log('Database is connected');
	} catch (error) {
		console.log(error.message);
	}
};

export default connectDB;
