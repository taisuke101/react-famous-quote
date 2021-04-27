module.exports = {
	type: process.env.DATABASE_TYPE_DEVELOPMENT,
	host: process.env.DATABASE_HOST_DEVELOPMENT,
	port: process.env.DATABASE_PORT_DEVELOPMENT,
	username: process.env.DATABASE_USERNAME_DEVELOPMENT,
	password: process.env.DATABASE_PASSWORD_DEVELOPMENT,
	database: process.env.DATABASE_NAME_DEVELOPMENT,
	synchronize: false,
	logging: false,
	entities: ['dist/entities/**/*.js'],
	migrations: ['dist/migration/**/*.js'],
	subscribers: ['dist/subscriber/**/*.js'],
	cli: {
		entitiesDir: 'src/entities',
		migrationsDir: 'src/migration',
		subscribersDir: 'src/subscriber',
	},
};
