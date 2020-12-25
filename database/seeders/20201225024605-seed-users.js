'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const hashedPass = await bcrypt.hash('123456', 12);
		return queryInterface.bulkInsert(
			'users',
			[
				{
					id: '1792b731-e1f1-4abd-9d4a-91dd3d94c8dd',
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
