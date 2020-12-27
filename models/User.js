const { Model, DataTypes } = require('sequelize');
const { v4: uuid } = require('uuid');

class User extends Model {
	static init(sequelize) {
		super.init(
			{
				name: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				email: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				password: {
					type: DataTypes.STRING,
					allowNull: false,
				},
			},
			{
				defaultScope: {
					attributes: { exclude: ['password'] },
				},
				scopes: {
					withPassword: {},
				},
				sequelize,
				modelName: 'User',
			},
		);

		super.beforeCreate((user, _) => {
			return (user.id = uuid());
		});
	}
}
module.exports = User;
