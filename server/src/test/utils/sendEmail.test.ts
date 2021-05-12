import { sendEmail } from '../../utils/sendEmail';

describe('sendEmailのテスト', () => {
	test('OK: メール送信に成功', async () => {
		jest.setTimeout(20000);
		const result = await sendEmail(
			'test@gmail.com',
			`
            <h1>テストメール送信</h1>
            `
		);

		expect(result).toBeDefined();
		expect(result.accepted).toContain('test@gmail.com');
		expect(result.response).toContain('250');
	});
});
