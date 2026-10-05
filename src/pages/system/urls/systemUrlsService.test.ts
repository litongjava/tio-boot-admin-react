import { request } from '@umijs/max';
import { download } from '@/utils/downloadUtils';
import {
  batchRemoveSystemUrls,
  createSystemUrls,
  exportAllSystemUrls,
  exportSystemUrls,
  pageSystemUrls,
  removeSystemUrls,
} from './systemUrlsService';

jest.mock('@umijs/max', () => ({ request: jest.fn() }));
jest.mock('@/utils/downloadUtils', () => ({ download: jest.fn() }));

const requestMock = jest.mocked(request);
const table = '/api/table/tio_boot_admin_system_urls';

beforeEach(() => {
  jest.clearAllMocks();
  requestMock.mockResolvedValue({ ok: true });
});

it('batch deletes selected records and preserves string IDs', async () => {
  const result = await batchRemoveSystemUrls([{ id: '9007199254740993' }, { id: 2 }]);
  expect(result).toEqual({ ok: true });
  expect(requestMock).toHaveBeenCalledTimes(1);
  expect(requestMock).toHaveBeenCalledWith(`${table}/batchUpdate`, {
    method: 'POST',
    data: { ids: ['9007199254740993', 2], ids_type: 'long[]', deleted: 1, deleted_type: 'int' },
  });
});

it.each([
  ['page', pageSystemUrls],
  ['create', createSystemUrls],
] as const)('sends %s data to the URL table', async (operation, send) => {
  const data = { name: 'example', idType: 'long' };
  await send(data);
  expect(requestMock).toHaveBeenCalledWith(`${table}/${operation}`, { method: 'POST', data });
});

it('soft deletes the selected ID in the URL table', async () => {
  await removeSystemUrls('9007199254740993');
  expect(requestMock).toHaveBeenCalledWith(`${table}/update`, {
    method: 'POST',
    data: { id: '9007199254740993', idType: undefined, deleted: 1, deleted_type: 'int' },
  });
});

it.each([
  ['export-current', exportSystemUrls],
  ['export-all', exportAllSystemUrls],
] as const)('exports %s with the supplied filters', async (operation, send) => {
  const blob = new Blob(['spreadsheet']);
  requestMock.mockResolvedValue(blob);
  const data = { deleted: 0 };
  await send(data);
  expect(requestMock).toHaveBeenCalledWith(`${table}/${operation}`, {
    method: 'POST', data, responseType: 'blob',
  });
  expect(download).toHaveBeenCalledWith(blob, expect.stringContaining('tio_boot_admin_system_urls-'));
});
