import {
	useRefreshDatabase,
	useSeeding,
	runSeeder,
	tearDownDatabase,
} from 'typeorm-seeding';
import { CreateQuotesSeed } from '../seeds/quote.seed';

beforeEach(async () => {
	await useRefreshDatabase();
	await useSeeding();

	await runSeeder(CreateQuotesSeed);
});

//TODO データローダーのテスト作成

afterAll(async () => {
	await tearDownDatabase();
});

describe('createLikeLoaderのテスト', () => {
	test('OK: お気に入り取得成功', async () => {});
});
