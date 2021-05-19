import React from 'react';
import { cleanup, render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import user from '@testing-library/user-event';
import { createMockClient } from 'mock-apollo-client';

import { mockRouter, mockRoute } from '../utils/test/mockRouter';
import QuoteCard from '../components/QuoteCard';
import {
	CreateFavoriteDocument,
	LikeQuoteDocument,
} from '../generated/graphql';
import { ApolloProvider } from '@apollo/client';

const quote = {
	id: '1',
	author: 'ゲーテ',
	country: 'ドイツ',
	job: '詩人、小説家、劇作家 / 1749～1832',
	text: '自分自身を信じてみるだけでいい。きっと、生きる道が見えてくる。',
	likeCount: 2,
	likeStatus: null,
	hasFavorite: false,
	createdAt: '2021-04-27T05:02:44.696Z',
};

const changeQuote = {
	id: '1',
	author: 'ゲーテ',
	country: 'ドイツ',
	job: '詩人、小説家、劇作家 / 1749～1832',
	text: '自分自身を信じてみるだけでいい。きっと、生きる道が見えてくる。',
	likeCount: 2,
	likeStatus: 1,
	hasFavorite: true,
	createdAt: '2021-04-27T05:02:44.696Z',
};

beforeEach(() => mockRouter.mockReturnValue(mockRoute));

afterEach(cleanup);

const mockClient = createMockClient();
const likeHandler = jest.fn();
const favoriteHandler = jest.fn();
mockClient.setRequestHandler(LikeQuoteDocument, likeHandler);
mockClient.setRequestHandler(CreateFavoriteDocument, favoriteHandler);

describe('QuoteCardのテスト', () => {
	test('OK 作者、国をクリックし、遷移先のURLが表示される', () => {
		const { getByText } = render(
			<MockedProvider>
				<QuoteCard quote={quote} wiki={true} />
			</MockedProvider>
		);

		user.click(getByText('ゲーテ'));
		expect(mockRoute.push).toHaveBeenCalledWith(
			'/quote/author/%E3%82%B2%E3%83%BC%E3%83%86',
			'/quote/author/%E3%82%B2%E3%83%BC%E3%83%86',
			{ locale: undefined, scroll: true, shallow: undefined }
		);
		user.click(getByText('ドイツ'));
		expect(mockRoute.push).toHaveBeenCalledWith(
			'/quote/country/%E3%83%89%E3%82%A4%E3%83%84',
			'/quote/country/%E3%83%89%E3%82%A4%E3%83%84',
			{ locale: undefined, scroll: true, shallow: undefined }
		);
	});

	test('OK: ステータスによっていいね、ストックのUIが変わる', async () => {
		const { getByTestId, rerender } = render(
			<MockedProvider>
				<QuoteCard quote={quote} wiki={true} />
			</MockedProvider>
		);
		const getUI = (name: string) => getByTestId(name);

		expect(getUI('名言をストックする')).toBeInTheDocument();
		expect(getUI('いいね！する')).toBeInTheDocument();

		rerender(
			<MockedProvider>
				<QuoteCard quote={changeQuote} wiki={true} />
			</MockedProvider>
		);

		expect(getUI('ストックから外す')).toBeInTheDocument();
		expect(getUI('いいね！を取り消す')).toBeInTheDocument();
	});

	test('OK: 要素クリック後ミューテーションが呼び出される', async () => {
		likeHandler.mockResolvedValueOnce({
			data: {
				likeQuote: true,
			},
		});
		favoriteHandler.mockResolvedValueOnce({
			data: {
				createFavorite: true,
			},
		});

		const { debug, getByTestId } = render(
			<ApolloProvider client={mockClient}>
				<QuoteCard quote={quote} wiki={true} />
			</ApolloProvider>
		);

		user.click(getByTestId('いいね！する'));
		user.click(getByTestId('名言をストックする'));

		await waitFor(() => {
			expect(likeHandler).toBeCalledTimes(1);
			expect(favoriteHandler).toBeCalledTimes(1);
		});
	});

	// test('NG: 未ログイン状態でいいね！、ストックをクリックし、ログインページに誘導される', async () => {
	// 	likeHandler.mockResolvedValueOnce({
	// 		errors: [
	// 			{
	// 				message: '認証されていません！',
	// 			},
	// 		],
	// 	});

	// 	const { debug, getByTestId } = render(
	// 		<ApolloProvider client={mockClient}>
	// 			<QuoteCard quote={quote} wiki={true} />
	// 		</ApolloProvider>
	// 	);

	// 	user.click(getByTestId('いいね！する'));

	// 	await waitFor(() => {
	// 		new Promise((resolve) => setTimeout(resolve, 0));
	// 	});
	// 	expect(mockRoute.push).toHaveBeenCalled();
	// });
});
