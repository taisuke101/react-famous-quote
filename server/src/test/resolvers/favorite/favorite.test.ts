import {
	runSeeder,
	tearDownDatabase,
	useRefreshDatabase,
	useSeeding,
} from 'typeorm-seeding';
import faker from 'faker';

import { CreateQuotesSeed } from '../../seeds/quote.seed';
import { graphqlCall } from '../../graphqlCall';
import { createUserMutation } from '../user/userTestResolvers';
import {
	createFavorite,
	getFavorits,
	getFavorite,
} from './favoriteTestResolvers';

beforeEach(async () => {
	await useRefreshDatabase();
	await useSeeding();

	await runSeeder(CreateQuotesSeed);
});

afterAll(async () => {
	await useRefreshDatabase();
	await tearDownDatabase();
});

const user = {
	username: faker.name.firstName(),
	email: faker.internet.email(),
	password: '1234',
	confirmPassword: '1234',
};

describe('createFavoriteのテスト', () => {
	test('OK: お気に入り作成成功', async () => {
		await graphqlCall({
			source: createUserMutation,
			variableValues: {
				data: user,
			},
		});

		const result = await graphqlCall({
			source: createFavorite,
			variableValues: {
				quoteId: 1,
			},
			userId: 1,
		});

		expect(result.data?.createFavorite).toBeTruthy();
	});

	test('OK: お気に入り=>お気に入り削除成功', async () => {
		await graphqlCall({
			source: createUserMutation,
			variableValues: {
				data: user,
			},
		});

		await graphqlCall({
			source: createFavorite,
			variableValues: {
				quoteId: 1,
			},
			userId: 1,
		});

		const result = await graphqlCall({
			source: createFavorite,
			variableValues: {
				quoteId: 1,
			},
			userId: 1,
		});

		expect(result).toBeTruthy();
	});

	test('NG: ユーザーが見つからず', async () => {
		await graphqlCall({
			source: createUserMutation,
			variableValues: {
				data: user,
			},
		});

		const result = await graphqlCall({
			source: createFavorite,
			variableValues: {
				quoteId: 1,
			},
			userId: 21312,
		});

		expect(result.errors).toBeDefined();
	});

	test('NG: 名言が見つからず', async () => {
		await graphqlCall({
			source: createUserMutation,
			variableValues: {
				data: user,
			},
		});

		const result = await graphqlCall({
			source: createFavorite,
			variableValues: {
				quoteId: 321321,
			},
			userId: 1,
		});

		expect(result.errors).toBeDefined();
	});
});

describe('getFavoritsのテスト', () => {
	test('OK: お気に入り取得成功', async () => {
		await graphqlCall({
			source: createUserMutation,
			variableValues: {
				data: user,
			},
		});

		await graphqlCall({
			source: createFavorite,
			variableValues: {
				quoteId: 1,
			},
			userId: 1,
		});

		const result = await graphqlCall({
			source: getFavorits,
			userId: 1,
		});

		expect(result.data?.getFavorits).toBeDefined();
	});

	test('NG: ユーザー認証がされていない', async () => {
		const result = await graphqlCall({
			source: getFavorits,
		});

		expect(result.errors).toBeDefined();
	});
});

describe('getFavoriteのテスト', () => {
	test('OK: お気に入り1件取得成功', async () => {
		await graphqlCall({
			source: createUserMutation,
			variableValues: {
				data: user,
			},
		});

		await graphqlCall({
			source: createFavorite,
			variableValues: {
				quoteId: 1,
			},
			userId: 1,
		});

		const result = await graphqlCall({
			source: getFavorite,
			variableValues: {
				quoteId: 1,
			},
			userId: 1,
		});

		expect(result).toBeDefined();
	});

	test('NG: ユーザー認証がされていない', async () => {
		const result = await graphqlCall({
			source: getFavorite,
		});

		expect(result.errors).toBeDefined();
	});
});
