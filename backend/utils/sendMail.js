import nodemailer from 'nodemailer';

const sendMailer = async ({ to, subject, message }) => {
	try {
		let transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: false, // true for 465, false for other ports
			auth: {
				user: process.env.SMTP_USER, // generated ethereal user
				pass: process.env.SMTP_PASSWORD, // generated ethereal password
			},
		});

		let info = await transporter.sendMail({
			from: '"Online Shop API 👻" onlineshoapi@gmail.com', // sender address
			to: to, // list of receivers
			subject: subject, // Subject line
			html: message, // html body
		});

		console.log('Message sent: %s', info.messageId);
	} catch (error) {
		console.log(error.message);
	}
};

export default sendMailer;
