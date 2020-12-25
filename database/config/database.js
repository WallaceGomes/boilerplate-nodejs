module.exports = {
	dialect: 'postgres',
	host: process.env.DATABASE_HOST,
	database: process.env.DATABASE_NAME,
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
	define: {
		timestamps: true,
		underscored: true,
	},
};
