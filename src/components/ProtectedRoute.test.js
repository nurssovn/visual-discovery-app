import { isAuthenticated } from '../utils/authGuard';

describe('ProtectedRoute auth guard', () => {
  it('returns false when user is null', () => {
    expect(isAuthenticated(null)).toBe(false);
  });

  it('returns true when user exists', () => {
    expect(isAuthenticated({ name: 'Test', username: '@test' })).toBe(true);
  });
});
