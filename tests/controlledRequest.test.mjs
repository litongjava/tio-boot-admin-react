import assert from 'node:assert/strict';
import test from 'node:test';
import {
  controlledRequest,
  isDefiniteRejection,
  RequestFailure,
} from '../src/utils/controlledRequest.mjs';
const response = (status, body) => ({
  ok: status >= 200 && status < 300,
  status,
  json: async () => body,
});
test('business envelopes preserve string IDs and explicit bearer + desktop headers', async () => {
  const data = await controlledRequest(
    '/api/test',
    { operationKey: 'same-key' },
    {
      token: 'business-token',
      desktop: true,
      fetcher: async (url, options) => {
        assert.equal(url, '/api/test');
        assert.equal(options.headers.Authorization, 'Bearer business-token');
        assert.equal(options.headers['X-Client-Surface'], 'AD_DESKTOP');
        assert.equal(JSON.parse(options.body).operationKey, 'same-key');
        return response(200, { code: 1, data: { id: '9007199254740993' } });
      },
    },
  );
  assert.equal(data.id, '9007199254740993');
});
test('transport failures remain unknown and are never retried', async () => {
  let count = 0;
  await assert.rejects(
    controlledRequest(
      '/api/test',
      {},
      {
        fetcher: async () => {
          count++;
          throw Error('network');
        },
      },
    ),
    (e) => e.code === 'UNKNOWN' && !isDefiniteRejection(e),
  );
  assert.equal(count, 1);
});
test('server failure and malformed success cannot authorize a new mutation', async () => {
  for (const fetcher of [
    async () => response(503, { code: 503, msg: 'pending' }),
    async () => ({
      ok: true,
      status: 200,
      json: async () => {
        throw Error('invalid json');
      },
    }),
  ]) {
    await assert.rejects(
      controlledRequest('/api/test', {}, { fetcher }),
      (e) => e.code === 'UNKNOWN' && !isDefiniteRejection(e),
    );
  }
});
test('current-session check prevents old user response disclosure', async () => {
  await assert.rejects(
    controlledRequest(
      '/api/test',
      {},
      {
        isCurrent: () => false,
        fetcher: async () => response(200, { code: 1, data: { private: 'old' } }),
      },
    ),
    (e) => e.code === 'SESSION_CHANGED',
  );
});
test('permission rejection retains HTTP status and business code', async () => {
  await assert.rejects(
    controlledRequest(
      '/api/test',
      {},
      {
        fetcher: async () =>
          response(403, { code: 403, msg: '无权', data: { businessCode: 'FORBIDDEN' } }),
      },
    ),
    (e) => e.status === 403 && e.code === 'FORBIDDEN' && isDefiniteRejection(e),
  );
});
test('timeout preserves uncertainty without issuing another request', async () => {
  await assert.rejects(
    controlledRequest(
      '/api/test',
      {},
      {
        timeout: 5,
        fetcher: (_, options) =>
          new Promise((_, reject) =>
            options.signal.addEventListener('abort', () => reject(Error('aborted'))),
          ),
      },
    ),
    RequestFailure,
  );
});
