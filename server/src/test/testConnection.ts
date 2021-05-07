import { createConnection } from 'typeorm';

export const testConnection = (drop: boolean = false) => {
	return createConnection({
		type: 'postgres',
		host: 'localhost',
		port: 5432,
		username: 'taisuke',
		password: '3Mumyouken3',
		database: 'famous_quote_test',
		synchronize: drop,
		dropSchema: drop,
		entities: ['src/entities/**/*.ts'],
	});
};
