export const mockRouter = jest.spyOn(require('next/router'), 'useRouter');

export const mockRoute = {
	push: jest.fn(() => Promise.resolve(true)),
	prefetch: jest.fn(() => Promise.resolve(true)),
	replace: jest.fn(() => Promise.resolve(true)),
	query: jest.fn(() => Promise.resolve(true)),
};
