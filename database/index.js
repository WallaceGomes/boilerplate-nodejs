const Sequelize = require('sequelize');

const User = require('../models/User');
const connection = new Sequelize(
	process.env.NODE_ENV === 'test'
		? process.env.TEST_DATABASE_URL
		: process.env.DATABASE_URL,
	{
		define: {
			timestamps: true,
			underscored: true,
		},
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	},
);

User.init(connection);

/* Associate */

// User.associate(connection.models);

module.exports = connection;
