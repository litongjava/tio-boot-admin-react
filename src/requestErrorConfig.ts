import type {RequestOptions} from '@@/plugin-request/request';
import type {RequestConfig} from '@umijs/max';
import {message, notification} from 'antd';

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}

// 与后端约定的响应数据格式
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function getErrorMessage(value: unknown, fallback = '请求失败，请重试'): string {
  if (!isRecord(value)) return fallback;
  for (const candidate of [value.msg, value.errorMessage, value.error]) {
    if (typeof candidate === 'string' && candidate.trim()) return candidate;
  }
  const status = isRecord(value.data) ? value.data.status : undefined;
  if (status === 'false' || status === 'error') return '请求失败，请检查输入或重新登录';
  return typeof status === 'string' && status.trim() && status !== 'ok' ? status : fallback;
}

class BizError extends Error {
  readonly name = 'BizError';
  constructor(readonly info: {
    errorMessage: string;
    errorCode?: string | number;
    showType?: number;
  }) {
    super(info.errorMessage);
  }
}

function throwBusinessError(res: unknown): void {
  if (!isRecord(res)) return;
  if (res.ok === false || res.code === 0 || res.success === false) {
    const code = res.errorCode ?? res.code;
    throw new BizError({
      errorMessage: getErrorMessage(res),
      errorCode: typeof code === 'number' || typeof code === 'string' ? code : undefined,
      showType: typeof res.showType === 'number' ? res.showType : undefined,
    });
  }
}

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: throwBusinessError,
    // 错误接收及处理
    errorHandler: (error, opts) => {
      if (opts?.skipErrorHandler) throw error;
      // 我们的 errorThrower 抛出的错误。
      if (error instanceof BizError) {
        const errorInfo = error.info;
        if (errorInfo) {
          const {errorMessage, errorCode} = errorInfo;
          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              message.warning(errorMessage);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              message.error(errorMessage);
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open({
                description: errorMessage,
                message: errorCode,
              });
              break;
            case ErrorShowType.REDIRECT:
              // TODO: redirect
              break;
            default:
              message.error(errorMessage);
          }
        }
      } else if ('response' in error && error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        message.error(`Response status:${error.response.status}`);
      } else if ('request' in error && error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        message.error('None response! Please retry.');
      } else {
        // 发送请求时出了点问题
        message.error('Request error, please retry.');
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 从本地存储中获取 token
      const token = localStorage.getItem('token') || '';

      // 如果存在 token，则将其添加到请求头中
      if (token) {
        const {headers = {}} = config;
        headers['Authorization'] = token;
        return {...config, headers};
      }

      return {...config};
    },
  ],


  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // Umi 只自动处理 success === false，这里补上后端 ok/code 错误包。
      throwBusinessError(response.data);
      return response;
    },
  ],
};
