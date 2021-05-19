import React from 'react';
import { cleanup, render, waitFor } from '@testing-library/react';
import { createMockClient } from 'mock-apollo-client';
import { ApolloProvider } from '@apollo/client';
import user from '@testing-library/user-event';

import { mockRoute, mockRouter } from '../utils/test/mockRouter';
import { GetToptenQuotesDocument, LoginDocument } from '../generated/graphql';
import LoginForm from '../components/LoginForm';

beforeEach(() => mockRouter.mockReturnValue(mockRoute));

afterEach(cleanup);

const mockClient = createMockClient();
const requestHandler = jest.fn();
mockClient.setRequestHandler(LoginDocument, requestHandler);

describe('LoginFormのテスト', () => {
	test('OK: ミューテーションが呼び出され、遷移先のURLが表示される', async () => {
		requestHandler.mockResolvedValueOnce({
			data: {
				login: {
					id: '1',
					username: 'taisuke',
					email: 'test@gmail.com',
				},
			},
		});
		mockClient.setRequestHandler(GetToptenQuotesDocument, () =>
			Promise.resolve({
				data: {
					getToptenQuotes: {
						id: '1',
						author: 'test',
						country: 'test',
						job: 'test',
						text: 'test',
						likeCount: null,
						likeStatus: null,
						hasFavorite: null,
					},
				},
			})
		);

		const { getByPlaceholderText, getByText, debug } = render(
			<ApolloProvider client={mockClient}>
				<LoginForm />
			</ApolloProvider>
		);

		user.type(
			getByPlaceholderText('ユーザー名またはメールアドレス'),
			'taisuke'
		);
		user.type(getByPlaceholderText('パスワード'), '1234');
		user.click(getByText('ログイン'));
		await waitFor(() => {
			expect(requestHandler).toHaveBeenCalledTimes(1);
			expect(mockRoute.push).toHaveBeenCalled();
		});
	});

	// test('OK: 未ログインでいいね！した時のエラーメッセージが表示される', async () => {
	// 	const { getByText, debug } = render(
	// 		<ApolloProvider client={mockClient}>
	// 			<LoginForm />
	// 		</ApolloProvider>
	// 	);

	// 	await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)));
	// 	debug();
	// });

	test('NG: エラーが発生し、エラーメッセージも表示される', async () => {
		requestHandler.mockResolvedValueOnce({
			errors: [
				{
					extensions: {
						formattedErrors: {
							usernameOrEmail: ['usernameOrEmailでエラーが発生'],
							password: ['passwordでエラーが発生'],
						},
					},
				},
			],
		});

		const { getByText, debug } = render(
			<ApolloProvider client={mockClient}>
				<LoginForm />
			</ApolloProvider>
		);

		user.click(getByText('ログイン'));
		await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)));
		expect(getByText('*usernameOrEmailでエラーが発生')).toBeInTheDocument();
		expect(getByText('*passwordでエラーが発生')).toBeInTheDocument();
	});
});
