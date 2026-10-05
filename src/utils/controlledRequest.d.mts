export class RequestFailure extends Error {
  code: string;
  status: number;
  constructor(message: string, code?: string, status?: number);
}
export function controlledRequest<T = unknown>(url: string, body: unknown, options?: {
  token?: string;
  desktop?: boolean;
  timeout?: number;
  fetcher?: typeof fetch;
  isCurrent?: () => boolean;
}): Promise<T>;
export function isDefiniteRejection(error: unknown): boolean;
