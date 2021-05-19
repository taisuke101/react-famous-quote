import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { cleanup, render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { createMockClient } from 'mock-apollo-client';

import Header from '../components/Header';
import { mockRouter, mockRoute } from '../utils/test/mockRouter';
import { GetMeDocument, LogoutDocument } from '../generated/graphql';
import { ApolloProvider } from '@apollo/client';

beforeEach(() => mockRouter.mockReturnValue(mockRoute));

afterEach(cleanup);

const mockClient = createMockClient();

mockClient.setRequestHandler(GetMeDocument, () =>
	Promise.resolve({
		data: {
			getMe: {
				id: '1',
				username: 'taisuke',
				__typename: 'User',
			},
		},
	})
);

describe('Headerのテスト', () => {
	test('OK:ログイン前: リンクをクリック=>遷移先のURLが表示される', () => {
		const { getByText, debug } = render(
			<MockedProvider>
				<Header />
			</MockedProvider>
		);

		user.click(getByText('名言ポータル'));
		expect(mockRoute.push).toHaveBeenCalled();
		user.click(getByText('このサイトについて'));
		expect(mockRoute.push).toHaveBeenCalled();
		user.click(getByText('名言一覧'));
		expect(mockRoute.push).toHaveBeenCalled();
		user.click(getByText('ログイン'));
		expect(mockRoute.push).toHaveBeenCalled();
		user.click(getByText('新規登録'));
		expect(mockRoute.push).toHaveBeenCalled();
	});

	test('OK:ログイン後: UIが変更されている', async () => {
		const mockClient = createMockClient();

		mockClient.setRequestHandler(GetMeDocument, () =>
			Promise.resolve({
				data: {
					getMe: {
						id: '1',
						username: 'taisuke',
						__typename: 'User',
					},
				},
			})
		);

		const { debug, getByText } = render(
			<ApolloProvider client={mockClient}>
				<Header />
			</ApolloProvider>
		);
		user.click(getByText('名言ポータル'));
		await waitFor(() =>
			expect(getByText('ユーザー名：taisuke')).toBeInTheDocument()
		);
	});

	test('OK:ログイン後: クリックして遷移先のURLが表示される', async () => {
		const { debug, getByText } = render(
			<ApolloProvider client={mockClient}>
				<Header />
			</ApolloProvider>
		);

		user.click(getByText('名言ポータル'));
		await waitFor(() => {
			user.click(getByText('名言ポータル'));
			expect(mockRoute.push).toHaveBeenCalled();
			user.click(getByText('このサイトについて'));
			expect(mockRoute.push).toHaveBeenCalled();
			user.click(getByText('名言一覧'));
			expect(mockRoute.push).toHaveBeenCalled();
			user.click(getByText('ユーザー名：taisuke'));
			expect(getByText('ストック一覧')).toBeInTheDocument();
			expect(getByText('ログアウト')).toBeInTheDocument();
		});
	});

	test('OK:ログイン後: ユーザー名をクリック=>メニューが展開=>遷移先URLが表示されている', async () => {
		const { debug, getByText } = render(
			<ApolloProvider client={mockClient}>
				<Header />
			</ApolloProvider>
		);
		user.click(getByText('名言ポータル'));
		await waitFor(() => {
			user.click(getByText('ユーザー名：taisuke'));
			user.click(getByText('ストック一覧'));
			expect(mockRoute.push).toHaveBeenCalled();
		});
	});

	test('OK:ログイン後: ログアウトミューテーションが呼び出される', async () => {
		const queryHandler = jest.fn().mockResolvedValue({
			data: {
				logout: true,
			},
		});
		mockClient.setRequestHandler(LogoutDocument, queryHandler);

		const { debug, getByText } = render(
			<ApolloProvider client={mockClient}>
				<Header />
			</ApolloProvider>
		);

		user.click(getByText('名言ポータル'));
		await waitFor(() => {
			user.click(getByText('ユーザー名：taisuke'));
		});
		user.click(getByText('ログアウト'));
		await waitFor(() => {
			expect(queryHandler).toHaveBeenCalled();
		});
	});

	test('OK: useRefが機能している', async () => {
		const { debug, getByText, queryByText } = render(
			<ApolloProvider client={mockClient}>
				<Header />
			</ApolloProvider>
		);

		user.click(getByText('名言ポータル'));
		await waitFor(() => user.click(getByText('ユーザー名：taisuke')));
		getByText('ユーザー名：taisuke').blur();
		await waitFor(() => user.click(getByText('名言ポータル')));
		expect(queryByText('ストック一覧')).not.toBeInTheDocument();
	});
});
