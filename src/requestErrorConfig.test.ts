import {message} from 'antd';
import {errorConfig, getErrorMessage} from './requestErrorConfig';

jest.mock('antd', () => ({
  message: {error: jest.fn(), warning: jest.fn()},
  notification: {open: jest.fn()},
}));

describe('backend error envelopes', () => {
  it.each([
    {ok: false, msg: '账号已禁用'},
    {code: 0, msg: '账号已禁用'},
    {success: false, errorMessage: '账号已禁用'},
  ])('throws and displays the backend message: %j', (response) => {
    const thrower = errorConfig.errorConfig?.errorThrower;
    expect(() => thrower?.(response)).toThrow('账号已禁用');
    try {
      thrower?.(response);
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      errorConfig.errorConfig?.errorHandler?.(error, {});
      expect(message.error).toHaveBeenLastCalledWith('账号已禁用');
      expect(() => errorConfig.errorConfig?.errorHandler?.(error, {
        skipErrorHandler: true,
      })).toThrow('账号已禁用');
    }
  });

  it('provides readable fallbacks for null messages and missing data', () => {
    expect(getErrorMessage({ok: false, msg: null, data: {status: 'false'}}))
      .toBe('请求失败，请检查输入或重新登录');
    expect(getErrorMessage(undefined)).toBe('请求失败，请重试');
  });

  it('accepts successful backend and legacy responses', () => {
    expect(() => errorConfig.errorConfig?.errorThrower?.({ok: true, code: 1}))
      .not.toThrow();
    expect(() => errorConfig.errorConfig?.errorThrower?.({success: true}))
      .not.toThrow();
  });
});
