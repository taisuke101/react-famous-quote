import {
	useRefreshDatabase,
	useSeeding,
	runSeeder,
	tearDownDatabase,
} from 'typeorm-seeding';
import { CreateQuotesSeed } from '../seeds/quote.seed';

beforeAll(async (done) => {
	await useRefreshDatabase();
	await useSeeding();

	await runSeeder(CreateQuotesSeed);
	done();
});

//TODO データローダーのテスト作成

afterAll(async () => {
	await useRefreshDatabase();
	await tearDownDatabase();
});

describe('createLikeLoaderのテスト', () => {
	test('OK: お気に入り取得成功', async () => {});
});
