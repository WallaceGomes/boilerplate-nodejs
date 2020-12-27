'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const hashedPass = await bcrypt.hash('123456', 12);
		return queryInterface.bulkInsert(
			'users',
			[
				{
					id: 'f60febfd-e20d-461c-9ee0-f5da4e955f51',
					name: 'Admin',
					email: 'admin@teste.com',
					password: hashedPass,
					created_at: new Date(),
					updated_at: new Date(),
				},
			],
			{},
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('users', null, {});
	},
};
