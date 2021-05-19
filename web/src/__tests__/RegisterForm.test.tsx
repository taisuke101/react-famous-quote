import React from 'react';
import { cleanup, render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { createMockClient } from 'mock-apollo-client';
import { ApolloProvider, InMemoryCache } from '@apollo/client';

import RegisterForm from '../components/RegisterForm';
import { CreateUserDocument } from '../generated/graphql';
import { mockRoute, mockRouter } from '../utils/test/mockRouter';

beforeEach(() => mockRouter.mockReturnValue(mockRoute));

afterEach(cleanup);

const mockClient = createMockClient();
const requestHandler = jest.fn();
mockClient.setRequestHandler(CreateUserDocument, requestHandler);

describe('RegisterFormのテスト', () => {
	test('OK: ミューテーションが呼び出され、遷移先のURLが表示される', async () => {
		requestHandler.mockResolvedValueOnce({
			data: {
				createUser: {
					id: '1',
					username: 'taisuke',
					email: 'test@gmail.com',
					password: '1234',
				},
			},
		});

		const { getByPlaceholderText, getByText, debug } = render(
			<ApolloProvider client={mockClient}>
				<RegisterForm />
			</ApolloProvider>
		);

		user.type(getByPlaceholderText('ユーザー名'), 'taisuke');
		user.type(getByPlaceholderText('Eメールアドレス'), 'test@gmail.com');
		user.type(getByPlaceholderText('パスワード'), '1234');
		user.type(getByPlaceholderText('確認用パスワード'), '1234');

		user.click(getByText('新規登録'));
		await waitFor(() => {
			expect(requestHandler).toHaveBeenCalledTimes(1);
			expect(mockRoute.push).toHaveBeenCalled();
		});
	});

	test('NG: エラーが発生し、エラーメッセージも表示される', async () => {
		requestHandler.mockResolvedValueOnce({
			errors: [
				{
					extensions: {
						formattedErrors: {
							username: ['usernameでエラーが発生'],
							email: ['emailでエラーが発生'],
							password: ['passwordでエラーが発生'],
							confirmPassword: ['confirmPasswordでエラーが発生'],
						},
					},
				},
			],
		});

		const { getByText, debug } = render(
			<ApolloProvider client={mockClient}>
				<RegisterForm />
			</ApolloProvider>
		);

		user.click(getByText('新規登録'));
		await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)));
		expect(getByText('*usernameでエラーが発生')).toBeInTheDocument();
		expect(getByText('*emailでエラーが発生')).toBeInTheDocument();
		expect(getByText('*passwordでエラーが発生')).toBeInTheDocument();
		expect(getByText('*confirmPasswordでエラーが発生')).toBeInTheDocument();
	});
});
