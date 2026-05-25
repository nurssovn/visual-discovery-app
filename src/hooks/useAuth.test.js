import { renderHook, act } from '@testing-library/react';
import { useAuth } from './useAuth';

describe('useAuth', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('registers a new user and logs them in', () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      const response = result.current.register('Nurs', 'secret123');
      expect(response.success).toBe(true);
    });

    expect(result.current.user?.name).toBe('Nurs');
    expect(result.current.user?.password).toBeUndefined();

    const session = JSON.parse(localStorage.getItem('pinterest_user'));
    expect(session.name).toBe('Nurs');
    expect(session.password).toBeUndefined();
  });

  it('rejects duplicate registration', () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.register('Nurs', 'pass');
    });

    let response;
    act(() => {
      response = result.current.register('nurs', 'other');
    });

    expect(response.success).toBe(false);
  });

  it('logs in existing user', () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.register('Test', 'mypass');
      result.current.logout();
    });

    act(() => {
      const response = result.current.login('Test', 'mypass');
      expect(response.success).toBe(true);
    });

    expect(result.current.user?.name).toBe('Test');
  });
});
