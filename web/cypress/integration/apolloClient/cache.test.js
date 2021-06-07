/// <reference types="cypress" />

describe('ApolloClentのキャッシュ動作確認', () => {
	it('OK: いいね！後にキャッシュが更新される', () => {
		cy.fixture('testUser.json').then((loginInfo) => {
			cy.visit('http://localhost:3000/login');
			cy.get('[placeholder="ユーザー名またはメールアドレス"]').type(
				loginInfo.username
			);
			cy.get('[placeholder="パスワード"]').type(loginInfo.password);
			cy.get('[type="submit"]').click();
			cy.visit('http://localhost:3000');
			cy.get('[data-testid="header-open"]').click();
			cy.get('[data-testid="stock-button"]').click();
			cy.get('[data-testid="いいね！する"]').first().click();
			cy.get('[data-testid="いいね！を取り消す"]').should('exist');
		});
	});

	it('OK: ストックを外した後にキャッシュが更新される', () => {
		cy.fixture('testUser.json').then((loginInfo) => {
			cy.visit('http://localhost:3000/login');
			cy.get('[placeholder="ユーザー名またはメールアドレス"]').type(
				loginInfo.username
			);
			cy.get('[placeholder="パスワード"]').type(loginInfo.password);
			cy.get('[type="submit"]').click();
			cy.visit('http://localhost:3000');
			cy.get('[data-testid="header-open"]').click();
			cy.get('[data-testid="stock-button"]').click();
			cy.get('[data-testid="ストックから外す"]').first().click();
			cy.get('[data-testid="名言をストックする"]').should('not.exist');
		});
	});
});
