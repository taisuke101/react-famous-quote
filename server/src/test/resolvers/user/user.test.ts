import { tearDownDatabase, useRefreshDatabase } from 'typeorm-seeding';
import faker from 'faker';
import Redis from 'ioredis';

import { User } from '../../../entities/User';
import { graphqlCall } from '../../graphqlCall';
import {
	getMeQuery,
	createUserMutation,
	login,
	logout,
	forgotPassword,
	changePassword,
} from './userTestResolvers';

beforeEach(async () => {
	await useRefreshDatabase();
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

describe('getMeQueryのテスト', () => {
	test('OK: getMeクエリでユーザー情報の取得に成功', async () => {
		const createUser = await User.create(user).save();

		const result = await graphqlCall({
			source: getMeQuery,
			userId: createUser.id,
		});

		expect(result).toMatchObject({
			data: {
				getMe: {
					id: `${createUser.id}`,
					username: createUser.username,
				},
			},
		});
	});

	test('NG: getMeクエリでユーザー情報を返さず', async () => {
		const result = await graphqlCall({
			source: getMeQuery,
		});

		expect(result).toMatchObject({
			data: {
				getMe: null,
			},
		});
	});
});

describe('createUserMutationのテスト', () => {
	test('OK: ユーザーの作成に成功', async () => {
		const result = await graphqlCall({
			source: createUserMutation,
			variableValues: {
				data: user,
			},
		});
		expect(result).toMatchObject({
			data: {
				createUser: {
					username: user.username,
					email: user.email,
				},
			},
		});
		const databaseUser = await User.findOne({
			where: { username: user.username },
		});
		expect(databaseUser).toBeDefined;
	});

	test('NG: Eメールではない形式を指定した', async () => {
		const result = await graphqlCall({
			source: createUserMutation,
			variableValues: {
				data: {
					username: faker.name.firstName(),
					email: faker.internet.password(),
					password: '1234',
					confirmPassword: '1234',
				},
			},
		});
		expect(result.data).toBeNull();
	});

	test('NG: すでに存在するユーザーを入力', async () => {
		await graphqlCall({
			source: createUserMutation,
			variableValues: {
				data: user,
			},
		});

		const result = await graphqlCall({
			source: createUserMutation,
			variableValues: {
				data: {
					username: user.username,
					email: 'test@gmail.com',
					password: user.password,
					confirmPassword: user.confirmPassword,
				},
			},
		});

		expect(result.errors).toBeDefined();
	});

	test('NG: すでに存在するメールアドレスを入力', async () => {
		await graphqlCall({
			source: createUserMutation,
			variableValues: {
				data: user,
			},
		});

		const result = await graphqlCall({
			source: createUserMutation,
			variableValues: {
				data: {
					username: 'test',
					email: user.email,
					password: user.password,
					confirmPassword: user.confirmPassword,
				},
			},
		});

		expect(result.errors).toBeDefined();
	});

	test('NG: パスワードと確認パスワードが一致せず', async () => {
		const result = await graphqlCall({
			source: createUserMutation,
			variableValues: {
				data: {
					username: faker.name.firstName(),
					email: faker.internet.password(),
					password: '1234',
					confirmPassword: '23456',
				},
			},
		});
		expect(result.data).toBeNull();
	});
});

describe('loginのテスト', () => {
	test('OK: ユーザー名でログインに成功', async () => {
		const createUser = await User.create(user).save();

		const result = await graphqlCall({
			source: login,
			variableValues: {
				usernameOrEmail: user.username,
				password: user.password,
			},
		});

		expect(result).toMatchObject({
			data: {
				login: {
					id: `${createUser.id}`,
					username: user.username,
				},
			},
		});
	});

	test('OK: メールアドレスでログインに成功', async () => {
		const createUser = await User.create(user).save();

		const result = await graphqlCall({
			source: login,
			variableValues: {
				usernameOrEmail: user.email,
				password: user.password,
			},
		});

		expect(result).toMatchObject({
			data: {
				login: {
					id: `${createUser.id}`,
					username: user.username,
				},
			},
		});
	});

	test('NG: ユーザーが存在せず', async () => {
		const result = await graphqlCall({
			source: login,
			variableValues: {
				usernameOrEmail: 'badUser',
				password: '1234',
			},
		});
		expect(result.data).toBeNull();
	});

	test('NG: 登録情報と違うパスワードを入力', async () => {
		await User.create(user).save();

		const result = await graphqlCall({
			source: login,
			variableValues: {
				usernameOrEmail: user.username,
				password: '654654',
			},
		});

		expect(result.data).toBeNull();
	});
});

describe('logoutのテスト', () => {
	test('OK: ログアウトに成功', async () => {
		await User.create(user).save();

		await graphqlCall({
			source: login,
			variableValues: {
				usernameOrEmail: user.username,
				password: user.password,
			},
		});

		const result = await graphqlCall({
			source: logout,
		});

		expect(result).toBeTruthy();
	});
});

describe('forgotPasswordのテスト', () => {
	test('OK: パスワードリセットメールの送信に成功', async () => {
		jest.setTimeout(20000);
		const redis = new Redis();

		await User.create(user).save();

		const result = await graphqlCall({
			source: forgotPassword,
			variableValues: {
				email: user.email,
			},
			redis,
		});

		expect(result).toBeTruthy();
		redis.disconnect();
	});

	test('NG: ユーザーが登録されていない', async () => {
		const redis = new Redis();

		const result = await graphqlCall({
			source: forgotPassword,
			variableValues: {
				email: user.email,
			},
		});

		expect(result).toBeTruthy();
		redis.disconnect();
	});
});

describe('changePasswordのテスト', () => {
	test('OK: パスワードの変更に成功', async () => {
		jest.setTimeout(20000);
		const redis = new Redis();
		await User.create(user).save();

		await graphqlCall({
			source: forgotPassword,
			variableValues: {
				email: user.email,
			},
			redis,
		});

		const result = await graphqlCall({
			source: changePassword,
			variableValues: {
				data: {
					newPassword: '12345',
				},
				token: 'test',
			},
			redis,
		});

		expect(result).toBeDefined();
		redis.disconnect();
	});
});
