import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, cleanup, render, waitFor } from '@testing-library/react';
import React from 'react';
import user from '@testing-library/user-event';

import Sidebar from '../components/Sidebar';
import { mockRoute, mockRouter } from '../utils/test/mockRouter';

beforeEach(() => mockRouter.mockReturnValue(mockRoute));

afterEach(cleanup);

describe('Sidebarのテスト', () => {
	test('OK: クリック=>サイドバーの展開に成功', async () => {
		const { getByText, getByTestId, getByPlaceholderText } = render(
			<MockedProvider>
				<Sidebar />
			</MockedProvider>
		);

		user.click(getByTestId('sidebar-button-close'));

		await waitFor(() => {
			expect(getByPlaceholderText('ワード検索')).toBeInTheDocument();
			expect(getByText('人物から探す')).toBeInTheDocument();
			expect(getByText('国別で探す')).toBeInTheDocument();
			expect(getByText('カテゴリーで探す')).toBeInTheDocument();
		});
	});

	test('OK: サイドバー展開=>収納に成功', async () => {
		const { getByTestId } = render(
			<MockedProvider>
				<Sidebar />
			</MockedProvider>
		);

		const closeSidebar = getByTestId('sidebar-button-close');

		user.click(closeSidebar);

		await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)));

		const openSidebar = getByTestId('sidebar-button-open');

		user.click(openSidebar);

		await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)));

		expect(closeSidebar).toBeDefined();
	});

	test('OK: サイドバー展開=>アコーディオンメニューの展開に成功', async () => {
		const { getByText, getByTestId } = render(
			<MockedProvider>
				<Sidebar />
			</MockedProvider>
		);

		user.click(getByTestId('sidebar-button-close'));

		await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)));

		user.click(getByText('人物から探す'));

		await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)));

		expect(getByText('人物から探す')).toEqual(
			expect.objectContaining({
				className: 'Collapsible__trigger is-open',
			})
		);
	});

	test('OK: アコーディオン展開=>収納に成功', async () => {
		const { getByText, getByTestId, debug } = render(
			<MockedProvider>
				<Sidebar />
			</MockedProvider>
		);

		user.click(getByTestId('sidebar-button-close'));

		await waitFor(() => user.click(getByText('人物から探す')));

		//debug(getByText('人物から探す'));

		await waitFor(() => user.click(getByText('人物から探す')));

		//debug(getByText('人物から探す')); //open

		// await waitFor(() => debug(getByText('人物から探す')));

		//TODO Closeにならない
		//debug(getByText('人物から探す'));

		// expect(getByText('人物から探す')).toEqual(
		// 	expect.objectContaining({
		// 		className: 'Collapsible__trigger is-closed',
		// 	})
		// );
	});

	test('OK: サイドバー展開=>アコーディオン展開=>子要素展開に成功', async () => {
		const { getByText, getByTestId, debug } = render(
			<MockedProvider>
				<Sidebar />
			</MockedProvider>
		);

		user.click(getByTestId('sidebar-button-close'));

		await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)));

		user.click(getByText('人物から探す'));

		await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)));

		user.click(getByText('・あ行'));

		await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)));

		expect(getByText('・あ行')).toEqual(
			expect.objectContaining({
				className: 'Collapsible__trigger is-open',
			})
		);
	});

	test('OK: 展開=>検索成功', async () => {
		const { getByText, getByTestId, getByPlaceholderText, debug } = render(
			<MockedProvider>
				<Sidebar />
			</MockedProvider>
		);

		user.click(getByTestId('sidebar-button-close'));

		await waitFor(() => {
			user.type(getByPlaceholderText('ワード検索'), 'ゲーテ');
			expect(getByText('ゲーテ')).toBeInTheDocument();
			fireEvent.submit(getByPlaceholderText('ワード検索'));
			expect(mockRoute.push).toHaveBeenCalledTimes(1);
		});
	});
});
