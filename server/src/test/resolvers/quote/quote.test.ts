import { Connection } from 'typeorm';
import faker from 'faker';

import { graphqlCall } from '../../graphqlCall';
import { runSeeder, useRefreshDatabase, useSeeding } from 'typeorm-seeding';
import { CreateQuotesSeed } from '../../seeds/quote.seed';
import {
	getQuotes,
	getQuote,
	getToptenQuotes,
	searchQuote,
	likeQuote,
} from './quoteTestResolvers';
import { createUserMutation } from '../user/userTestResolvers';

let connection: Connection;

beforeAll(async (done) => {
	connection = await useRefreshDatabase();
	await useSeeding();

	await runSeeder(CreateQuotesSeed);
	done();
});

afterAll(async () => {
	await useRefreshDatabase();
	await connection.close();
});

const user = {
	username: faker.name.firstName(),
	email: faker.internet.email(),
	password: '1234',
	confirmPassword: '1234',
};

describe('getQuotesのテスト', () => {
	test('OK: 名言10件取得成功', async () => {
		const result = await graphqlCall({
			source: getQuotes,
			variableValues: {
				limit: 10,
				cursor: null,
			},
		});

		expect(result.data).toBeDefined();
	});
});

describe('getQuoteのテスト', () => {
	test('OK: 個別名言取得成功', async () => {
		const result = await graphqlCall({
			source: getQuote,
			variableValues: {
				author: 'テスト',
			},
		});

		expect(result.data?.getQuote).toBeDefined();
	});
});

describe('getToptenQuotesのテスト', () => {
	test('OK: 人気TOP10の名言取得成功', async () => {
		const result = await graphqlCall({
			source: getToptenQuotes,
		});

		expect(result.data?.getToptenQuotes).toBeDefined();
	});
});

describe('searchQuoteのテスト', () => {
	test('OK: 名言検索成功', async () => {
		const result = await graphqlCall({
			source: searchQuote,
			variableValues: {
				searchArgs: 'テスト',
			},
		});

		expect(result.data?.searchQuote).toBeDefined();
	});

	test('OK: 検索結果なし', async () => {
		const result = await graphqlCall({
			source: searchQuote,
			variableValues: {
				searchArgs: 'flkdjla',
			},
		});

		expect(result).toEqual({ data: { searchQuote: [] } });
	});
});

describe('likeQuoteのテスト', () => {
	test('OK: 名言のいいね！に成功', async () => {
		await graphqlCall({
			source: createUserMutation,
			variableValues: {
				data: user,
			},
		});

		const result = await graphqlCall({
			source: likeQuote,
			variableValues: {
				value: 1,
				quoteId: 1,
			},
			userId: 1,
		});

		expect(result.data?.likeQuote).toBeTruthy();
	});

	test('NG: ユーザー認証がされてない', async () => {
		const result = await graphqlCall({
			source: likeQuote,
			variableValues: {
				value: 1,
				quoteId: 1,
			},
		});

		expect(result.errors).toBeDefined();
	});
});
