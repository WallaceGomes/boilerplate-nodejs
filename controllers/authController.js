const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const HttpError = require('../models/http-error');
const User = require('../models/User');

exports.login = async (req, res, next) => {
	const { email, password } = req.body;

	let user;
	try {
		user = await User.scope('withPassword').findOne({
			where: { email: email },
		});
		if (!user) {
			const error = new HttpError('Invalid password or email', 403);
			return next(error);
		}
	} catch (err) {
		console.error(err);
		const error = new HttpError(
			`Wasn't possible to login, try again later... (code: user check)`,
			500,
		);
		return next(error);
	}

	try {
		let isValidPass = false;
		isValidPass = await bcrypt.compare(password, user.password);

		if (!isValidPass) {
			const error = new HttpError('Invalid password or email', 401);
			return next(error);
		}
	} catch (err) {
		console.error(err);
		const error = new HttpError(
			`Wasn't possible to login, try again later... (code: bcrypt)`,
			500,
		);
		return next(error);
	}

	try {
		const token = jwt.sign(
			{ userId: user.id, email: user.email },
			process.env.JWT_KEY,
		);
		return res.status(200).json({
			userName: user.name,
			id: user.id,
			email: user.email,
			token: token,
		});
	} catch (err) {
		console.error(err);
		const error = new HttpError(
			`Wasn't possible to login, try again later... (code: jwt)`,
			500,
		);
		return next(error);
	}
};

exports.forgotPassword = async (req, res, next) => {
	const { email } = req.body;

	let user;
	try {
		user = await User.findOne({
			where: {
				email: email,
			},
		});
		if (!user) {
			const error = new HttpError('Invalid email', 404);
			return next(error);
		}
	} catch (err) {
		const error = new HttpError('Server error', 500);
		return next(error);
	}

	let token;
	try {
		token = jwt.sign(
			{ userId: user.id, email: user.email },
			process.env.RESET_PASSWORD_KEY,
			{ expiresIn: '20m' },
		);
	} catch (err) {
		const error = new HttpError(
			'Server error try again later. (codigo: JWT)',
			500,
		);
		return next(error);
	}

	// send email wth token here here

	res.status(202).json({ token: token });
};

exports.resetPass = async (req, res, next) => {
	const { newPassword } = req.body;
	const { resetLink } = req.params;

	if (resetLink) {
		jwt.verify(
			resetLink,
			process.env.RESET_PASSWORD_KEY,
			async (err, decodedData) => {
				if (err) {
					const error = new HttpError('Invalid key', 401);
					console.log(err);
					return next(error);
				}

				let hashedPassword;
				try {
					hashedPassword = await bcrypt.hash(newPassword, 12);
				} catch (err) {
					const error = new HttpError(
						'Server error, try again later. (codigo: hash error)',
						500,
					);
					return next(error);
				}

				try {
					const user = await User.findOne({
						where: { id: decodedData.userId },
					});

					if (!user) {
						const error = new HttpError(
							'Could not find any user for the provided ID',
							404,
						);
						return next(error);
					}

					user.password = hashedPassword;

					await user.save();

					return res.status(200).json({ message: 'Password changed!' });
				} catch (err) {
					const error = new HttpError('Unexpected error', 500);
					console.log(err);
					return next(error);
				}
			},
		);
	} else {
		const error = new HttpError('Invalid link', 401);
		return next(error);
	}
};
