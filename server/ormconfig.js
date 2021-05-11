module.exports = {
	type: process.env.DATABASE_TYPE_DEVELOPMENT,
	host: process.env.DATABASE_HOST_DEVELOPMENT,
	port: process.env.DATABASE_PORT_DEVELOPMENT,
	username: process.env.DATABASE_USERNAME_DEVELOPMENT,
	password: process.env.DATABASE_PASSWORD_DEVELOPMENT,
	database:
		process.env.NODE_ENV === 'test'
			? process.env.DATABASE_NAME_TEST
			: process.env.DATABASE_NAME_DEVELOPMENT,
	logging: false,
	synchronize: process.env.NODE_ENV === 'test' ? true : false,
	dropSchema: process.env.NODE_ENV === 'test' ? true : false,
	entities:
		process.env.NODE_ENV === 'test'
			? ['src/entities/**/*.ts']
			: ['dist/entities/**/*.js'],
	migrations: ['dist/migration/**/*.js'],
	subscribers: ['dist/subscriber/**/*.js'],
	cli: {
		entitiesDir: 'src/entities',
		migrationsDir: 'src/migration',
		subscribersDir: 'src/subscriber',
	},
};
