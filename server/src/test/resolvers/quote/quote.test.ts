import { Connection } from 'typeorm';
// import faker from 'faker';

import { testConnection } from '../../testConnection';
import { graphqlCall } from '../../graphqlCall';

let connection: Connection;

beforeAll(async () => {
	connection = await testConnection(true);
});

afterAll(async () => {
	await connection.close();
});

const getQuotes = `
    query getQuotes($limit: Int!, $cursor: String) {
        getQuotes(
            limit: $limit,
            cursor: $cursor
        ) {
            hasMore
            quotes {
                id
                author
                country
                job
                text
                likeCount
                likeStatus
                hasFavorite
            }
        }
    }
`;

// const user = {
// 	username: faker.name.firstName(),
// 	email: faker.internet.email(),
// 	password: '1234',
// 	confirmPassword: '1234',
// };

describe('getQuotesのテスト', () => {
	test('OK: 名言10件取得成功', async () => {
		const result = await graphqlCall({
			source: getQuotes,
			variableValues: {
				limit: 10,
				cursor: null,
			},
		});

		expect(result.data?.getQuotes.quotes).toBeDefined;
	});
});
