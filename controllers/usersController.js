const bcrypt = require('bcryptjs');

const HttpError = require('../models/http-error');
const User = require('../models/User');

exports.create = async (req, res, next) => {
	const { name, email, password } = req.body;

	try {
		const checkUser = await User.findOne({ where: { email: email } });
		if (checkUser) {
			const error = new HttpError('This email is already being used!', 422);
			return next(error);
		}
	} catch (err) {
		console.error(err);
		const error = new HttpError('Connection error, user check DB', 500);
		return next(error);
	}

	let hashedPassword;
	try {
		hashedPassword = await bcrypt.hash(password, 12);
	} catch (err) {
		console.error(err);
		const error = new HttpError(
			'It was not possible to create the user, try again later. (code: hash error)',
			500,
		);
		return next(error);
	}

	try {
		const createdUser = await User.create({
			name,
			email,
			password: hashedPassword,
		});

		createdUser.password = undefined;

		return res.status(201).json(createdUser);
	} catch (err) {
		console.error(err);
		const error = new HttpError(
			'It was not possible to create the user, try again later. (code: save)',
			500,
		);
		return next(error);
	}
};

exports.indexAll = async (req, res, next) => {
	try {
		const users = await User.findAndCountAll({
			order: [['id', 'DESC']],
		});

		return res.status(200).json(users.rows);
	} catch (err) {
		console.error(err);
		const error = new HttpError('Connection error, user check DB', 500);
		return next(error);
	}
};

exports.indexOne = async (req, res, next) => {
	const { userId } = req.params;

	let user;
	try {
		user = await User.findOne({
			where: { id: userId },
		});
		if (!user) {
			const error = new HttpError('User does not exists', 400);
			return next(error);
		}
		return res.status(200).json(user);
	} catch (err) {
		console.error(err);
		const error = new HttpError('Connection error. (code: user check DB)', 500);
		return next(error);
	}
};

exports.update = async (req, res, next) => {
	const { name, email } = req.body;
	const { userId } = req.params;

	let checkUser;
	try {
		checkUser = await User.findOne({
			where: { id: userId },
		});
		if (!checkUser) {
			const error = new HttpError('User does not exists', 400);
			return next(error);
		}
	} catch (err) {
		console.error(err);
		const error = new HttpError(
			'Not able to find the user (code: user check DB)',
			500,
		);
		return next(error);
	}

	try {
		const updatedUser = await checkUser.update({
			name,
			email,
		});

		return res.status(200).json(updatedUser);
	} catch (err) {
		console.error(err);
		const error = new HttpError(
			'Wasn´t possible to update the user. (code: save)',
			500,
		);
		return next(error);
	}
};

exports.delete = async (req, res, next) => {
	const { userId } = req.params;

	try {
		const user = await User.findOne({ where: { id: userId } });

		if (!user) {
			const error = new HttpError('User does not exists', 400);
			return next(error);
		}

		await user.destroy();

		return res.status(200).json('User deleted');
	} catch (err) {
		console.error(err);
		const error = new HttpError(
			'Unable to delete the user - server error',
			500,
		);
		return next(error);
	}
};
