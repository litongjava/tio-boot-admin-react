import React from 'react';
import { TestBrowser } from '@@/testBrowser';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import * as api from '@/services/ant-design-pro/api';

jest.mock('@/services/ant-design-pro/api', () => ({
  login: jest.fn(),
  currentUser: jest.fn(),
}));

const originalLocation = window.location;

beforeEach(() => {
  jest.mocked(api.login).mockResolvedValue({
    ok: true,
    data: { token: 'test-login-token', status: 'ok', type: 'account' },
  });
  jest.mocked(api.currentUser).mockResolvedValue({
    data: { id: '1', nickname: 'Admin', access: 'admin' },
  });
  localStorage.clear();
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: { ...originalLocation, href: 'http://localhost:8000/user/login' },
  });
});

afterEach(() => {
  Object.defineProperty(window, 'location', { configurable: true, value: originalLocation });
  jest.clearAllMocks();
});

async function renderLogin() {
  const root = render(React.createElement(TestBrowser, { location: { pathname: '/user/login' } }));
  await root.findByPlaceholderText('Username');
  await waitFor(() => expect(root.getByRole('tab').getAttribute('aria-controls')).toBeTruthy());
  return root;
}

async function submitLogin(root: import('@testing-library/react').RenderResult) {
  fireEvent.change(await root.findByPlaceholderText('Username'), { target: { value: 'admin' } });
  fireEvent.change(await root.findByPlaceholderText('Password'), { target: { value: 'ant.design' } });
  await act(async () => { fireEvent.click(await root.findByText('Login')); });
}

describe('Login Page', () => {
  it.each([
    { ok: false, code: 0, data: { status: 'false' } },
    { ok: true, code: 1, data: { status: 'ok' } },
  ])('rejects failed or tokenless backend responses: %j', async (response) => {
    jest.mocked(api.login).mockResolvedValue(response);
    const root = await renderLogin();
    await submitLogin(root);
    await root.findByText('Incorrect username/password');
    expect(localStorage.getItem('token')).toBeNull();
    expect(api.currentUser).not.toHaveBeenCalled();
  });

  it('stays logged out when currentUser rejects after login', async () => {
    jest.mocked(api.currentUser).mockRejectedValue(new Error('Unauthorized'));
    const root = await renderLogin();
    await submitLogin(root);
    await waitFor(() => expect(localStorage.getItem('token')).toBeNull());
    expect(window.location.href).toBe('http://localhost:8000/user/login');
  });

  it('should show login form', async () => {
    const root = await renderLogin();
    expect(root.baseElement.querySelector('.ant-pro-form-login-desc')?.textContent).toBe(
      'Tio Boot Admin is the most influential web design specification',
    );
    expect(root.asFragment()).toMatchSnapshot();
  });

  it('should login success', async () => {
    const root = await renderLogin();
    await submitLogin(root);
    await waitFor(() => expect(window.location.href).toBe('/'));
    expect(api.login).toHaveBeenCalledWith({
      username: 'admin', password: 'ant.design', autoLogin: true, type: 'account',
    }, { skipErrorHandler: true });
    expect(localStorage.getItem('token')).toBe('test-login-token');
    expect(api.currentUser).toHaveBeenCalled();
  });

  it('keeps the login form usable when a rejected response has no data', async () => {
    jest.mocked(api.login).mockResolvedValue({ ok: false, msg: 'Invalid credentials' });
    const root = await renderLogin();
    await submitLogin(root);
    await root.findByText('Incorrect username/password');
    expect(root.queryByPlaceholderText('Username')).toBeTruthy();
    expect(localStorage.getItem('token')).toBeNull();
    expect(window.location.href).toBe('http://localhost:8000/user/login');
  });
});
