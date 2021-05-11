import { Connection, createConnection } from 'typeorm';
import faker from 'faker';

import { User } from '../../../entities/User';
import { graphqlCall } from '../../graphqlCall';
import {
	getMeQuery,
	createUserMutation,
	login,
	logout,
	forgotPassword,
} from './userTestResolvers';

let connection: Connection;

beforeAll(async () => {
	connection = await createConnection();
});

afterAll(async () => {
	await connection.close();
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

		await User.delete({ id: createUser.id });
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
	test('OK: createUserでユーザーの作成に成功', async () => {
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

		await User.delete({ username: user.username });
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
	test('OK: ログインに成功', async () => {
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
		const result = await graphqlCall({
			source: login,
			variableValues: {
				usernameOrEmail: user.username,
				password: '654654',
			},
		});

		expect(result.data).toBeNull();
		await User.delete({ username: user.username });
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
		await User.delete({ username: user.username });
	});
});

describe('forgotPasswordのテスト', () => {
	test('OK: パスワードリセットメールの送信に成功', async () => {
		const result = await graphqlCall({
			source: forgotPassword,
			variableValues: {
				email: user.email,
			},
		});

		expect(result).toBeTruthy();
	});
});

//TODO changePasswordの実装
// describe('changePasswordのテスト', () => {
// 	test('OK: パスワードの変更に成功', async () => {
// 		await User.create(user).save();
// 	});
// });
