/// <reference types="cypress" />
import faker from 'faker';

describe('認証周りのテスト', () => {
	it('OK: 新規登録に成功', () => {
		cy.visit('http://localhost:3000/register');
		cy.get('[placeholder="ユーザー名"]').type(faker.name.firstName());
		cy.get('[placeholder="Eメールアドレス"]').type(faker.internet.email());
		cy.get('[placeholder="パスワード"]').type('1234');
		cy.get('[placeholder="確認用パスワード"]').type('1234');
		cy.get('[type="submit"]').click();
		cy.reload();
		cy.get('.cursor-pointer').should('contain', 'ユーザー名：');
	});

	it('OK: ログインに成功', () => {
		cy.fixture('testUser.json').then((loginInfo) => {
			cy.visit('http://localhost:3000/login');
			cy.get('[placeholder="ユーザー名またはメールアドレス"]').type(
				loginInfo.username
			);
			cy.get('[placeholder="パスワード"]').type(loginInfo.password);
			cy.get('[type="submit"]').click();
			cy.reload();
			cy.get('.cursor-pointer').should('contain', 'ユーザー名：');
		});
	});

	it('OK: ログアウトに成功', () => {
		cy.fixture('testUser.json').then((loginInfo) => {
			cy.visit('http://localhost:3000/login');
			cy.get('[placeholder="ユーザー名またはメールアドレス"]').type(
				loginInfo.username
			);
			cy.get('[placeholder="パスワード"]').type(loginInfo.password);
			cy.get('[type="submit"]').click();
			cy.reload();
			cy.get('[data-testid="header-open"]').click();
			cy.get('[data-testid="logout-button"]').click();
			cy.location('pathname').should('eq', '/');
		});
	});
});
