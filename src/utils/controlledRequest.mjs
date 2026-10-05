/** Business envelope + conservative unknown outcomes. No automatic mutation retries. */
export class RequestFailure extends Error {
  constructor(message, code = 'UNKNOWN', status = 0) {
    super(message);
    this.code = code;
    this.status = status;
  }
}
export async function controlledRequest(
  url,
  body,
  { token = '', desktop = false, fetcher = fetch, timeout = 15000, isCurrent = () => true } = {},
) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetcher(url, {
      method: 'POST',
      credentials: 'same-origin',
      cache: 'no-store',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(desktop ? { 'X-Client-Surface': 'AD_DESKTOP' } : {}),
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    if (!isCurrent()) {
      throw new RequestFailure('会话已改变，请重新读取', 'SESSION_CHANGED');
    }
    if (response.ok && (result.code === 1 || result.code === 200)) {
      return result.data;
    }
    throw new RequestFailure(
      result.msg || '请求未完成，请查询原操作',
      response.status >= 500 ? 'UNKNOWN' : result.data?.businessCode || 'REQUEST_REJECTED',
      response.status,
    );
  } catch (error) {
    if (error instanceof RequestFailure) {
      throw error;
    }
    throw new RequestFailure('网络或响应异常，结果尚未确认，请查询原操作');
  } finally {
    clearTimeout(timer);
  }
}
export function isDefiniteRejection(error) {
  return (
    error instanceof RequestFailure &&
    error.status >= 400 &&
    error.status < 500 &&
    error.code !== 'UNKNOWN' &&
    error.code !== 'SESSION_CHANGED'
  );
}
