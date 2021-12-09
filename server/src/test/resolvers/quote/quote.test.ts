import faker from 'faker';
import {
	runSeeder,
	tearDownDatabase,
	useRefreshDatabase,
	useSeeding,
} from 'typeorm-seeding';

import { graphqlCall } from '../../graphqlCall';
import { CreateQuotesSeed } from '../../seeds/quote.seed';
import {
	getQuotes,
	getQuote,
	getToptenQuotes,
	searchQuote,
	likeQuote,
} from './quoteTestResolvers';
import { createUserMutation } from '../user/userTestResolvers';
import { createLikeLoader } from '../../../utils/createLikeLoader';
import { createFavoriteLoader } from '../../../utils/createFavoriteLoader';
import { User } from '../../../entities/User';

beforeEach(async () => {
	await useRefreshDatabase();
	await useSeeding();

	await runSeeder(CreateQuotesSeed);
});

afterAll(async () => {
	await tearDownDatabase();
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
			likeLoader: createLikeLoader(),
			favoriteLoader: createFavoriteLoader(),
		});

		expect(result.data?.getQuotes.hasMore).toBeTruthy();
		expect(result.data?.getQuotes.quotes).toBeDefined();
	});

	test('OK: ページネーションが動作している', async () => {
		const result = await graphqlCall({
			source: getQuotes,
			variableValues: {
				limit: 10,
				cursor: '10',
			},
			userId: 1,
			likeLoader: createLikeLoader(),
			favoriteLoader: createFavoriteLoader(),
		});

		expect(result.data?.getQuotes.hasMore).toBeFalsy();
		expect(result.data?.getQuotes.quotes).toBeDefined();
	});

	test('NG: カーサーに無効な値を挿入', async () => {
		const result = await graphqlCall({
			source: getQuotes,
			variableValues: {
				limit: 10,
				cursor: 10,
			},
			userId: 1,
			likeLoader: createLikeLoader(),
			favoriteLoader: createFavoriteLoader(),
		});

		expect(result.errors).toBeDefined();
	});
});

describe('getQuoteのテスト', () => {
	test('OK: 個別名言(author, country, job, category)取得成功', async () => {
		const resultAuthor = await graphqlCall({
			source: getQuote,
			variableValues: {
				author: 'テスト',
			},
			userId: 1,
			likeLoader: createLikeLoader(),
			favoriteLoader: createFavoriteLoader(),
		});

		expect(resultAuthor.data?.getQuote).toBeDefined();

		const resultCountry = await graphqlCall({
			source: getQuote,
			variableValues: {
				country: 'テスト',
			},
			userId: 1,
			likeLoader: createLikeLoader(),
			favoriteLoader: createFavoriteLoader(),
		});

		expect(resultCountry).toBeDefined();

		const resultJob = await graphqlCall({
			source: getQuote,
			variableValues: {
				job: 'テスト',
			},
			userId: 1,
			likeLoader: createLikeLoader(),
			favoriteLoader: createFavoriteLoader(),
		});

		expect(resultJob).toBeDefined();

		const resultCategory = await graphqlCall({
			source: getQuote,
			variableValues: {
				category: 'テスト',
			},
			userId: 1,
			likeLoader: createLikeLoader(),
			favoriteLoader: createFavoriteLoader(),
		});

		expect(resultCategory.data?.getQuote).toBeDefined();
	});
});

describe('getToptenQuotesのテスト', () => {
	test('OK: 人気TOP10の名言取得成功', async () => {
		const result = await graphqlCall({
			source: getToptenQuotes,
			userId: 1,
			likeLoader: createLikeLoader(),
			favoriteLoader: createFavoriteLoader(),
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
			userId: 1,
			likeLoader: createLikeLoader(),
			favoriteLoader: createFavoriteLoader(),
		});

		expect(result.data?.searchQuote).toBeDefined();
	});

	test('OK: 検索結果なし', async () => {
		const result = await graphqlCall({
			source: searchQuote,
			variableValues: {
				searchArgs: 'flkdjla',
			},
			userId: 1,
			likeLoader: createLikeLoader(),
			favoriteLoader: createFavoriteLoader(),
		});

		expect(result).toEqual({ data: { searchQuote: [] } });
	});
});

describe('likeQuoteのテスト', () => {
	test('OK: 名言のいいね!に成功', async () => {
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

	test('OK: いいね=>いいねの取り消しに成功', async () => {
		await User.create(user).save();

		await graphqlCall({
			source: likeQuote,
			variableValues: {
				value: 1,
				quoteId: 1,
			},
			userId: 1,
		});

		const result = await graphqlCall({
			source: likeQuote,
			variableValues: {
				value: -1,
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
