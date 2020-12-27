module.exports = {
	dialect: 'postgres',
	host: 'ec2-34-237-166-54.compute-1.amazonaws.com',
	database: 'd1ofpfdmgrn05r',
	username: 'tnbsismqpzezrd',
	password: 'e70cfb010faa55d450168e8c8c8d1cdd9970ad3431294adf2e81512e60957dac',
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
