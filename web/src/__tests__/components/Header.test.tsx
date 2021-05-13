import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';

import Header from '../../components/Header';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('Headerのテスト', () => {
	test('OK: リンクをクリック=>遷移先のURLが表示される', () => {
		const router = {
			push: jest.fn(() => Promise.resolve(true)),
			prefetch: jest.fn(() => Promise.resolve(true)),
			replace: jest.fn(() => Promise.resolve(true)),
		};
		useRouter.mockReturnValue(router);
		const { getByText } = render(
			<MockedProvider addTypename={false}>
				<Header />
			</MockedProvider>
		);

		user.click(getByText('名言ポータル'));
		expect(router.push).toHaveBeenCalledWith('/', '/', {
			locale: undefined,
			scroll: true,
			shallow: undefined,
		});
		user.click(getByText('このサイトについて'));
		expect(router.push).toHaveBeenCalledWith('/about', '/about', {
			locale: undefined,
			scroll: true,
			shallow: undefined,
		});
		user.click(getByText('名言一覧'));
		expect(router.push).toHaveBeenCalledWith('/quotes', '/quotes', {
			locale: undefined,
			scroll: true,
			shallow: undefined,
		});
		user.click(getByText('ログイン'));
		expect(router.push).toHaveBeenCalledWith('/login', '/login', {
			locale: undefined,
			scroll: true,
			shallow: undefined,
		});
		user.click(getByText('新規登録'));
		expect(router.push).toHaveBeenCalledWith('/register', '/register', {
			locale: undefined,
			scroll: true,
			shallow: undefined,
		});
	});
});
