// @ts-ignore
import {request} from '@umijs/max';
import {download} from "@/utils/downloadUtils";

export async function pageRequest(data: any, tableName?: string): Promise<API.Result> {
  return request<API.Result>(`/api/table/${tableName}/page`, {
    method: 'POST',
    data,
  });
}

export async function listRequest(data: any, tableName?: string): Promise<API.Result> {
  return request<API.Result>(`/api/table/${tableName}/list`, {
    method: 'POST',
    data,
  });
}

export async function exportRequest(data: any, tableName?: string) {
  // 发送请求并获取响应，注意responseType: 'blob'用于指示响应应该是一个Blob对象
  const response = await request<Blob>(`/api/table/${tableName}/export-current`, {
    method: 'POST',
    data,
    responseType: 'blob'
  });

  let currentDateString = new Date().toLocaleString();
  let filename = `${tableName}-current-${currentDateString}.xlsx`;
  download(response, filename);
}


export async function exportAllRequest(data: any, tableName?: string) {
  const response = await request<Blob>(`/api/table/${tableName}/export-all`, {
    method: 'POST',
    data,
    responseType: 'blob'
  });
  let currentDateString = new Date().toLocaleString();
  let filename = `${tableName}-all-${currentDateString}.xlsx`;
  download(response, filename);
}


export async function createRequest(data: any, tableName?: string) {
  return request<API.Result>(`/api/table/${tableName}/create`, {
    method: 'POST',
    data,
  });
}

export async function getRequest(id: any, params?: any, tableName?: string) {
  return request<API.Result>(`/api/table/${tableName}/get`, {
    method: 'POST',
    data: {
      id: id,
      ...params
    },
  });
}

export async function updateRequest(data: any, tableName?: string) {
  return request<API.Result>(`/api/table/${tableName}/update`, {
    method: 'POST',
    data,
  });
}

export async function softRemoveRequest(id: any, tableName?: string, idType?: string) {
  return request<API.Result>(`/api/table/${tableName}/update`, {
    method: 'POST',
    data: {
      id: id,
      idType: idType,
      "deleted": 1,
      "deleted_type": "int",
    },
  });
}

export async function softRecoveryRequest(id: any, tableName?: string, idType?: string) {
  return request<API.Result>(`/api/table/${tableName}/update`, {
    method: 'POST',
    data: {
      id: id,
      idType: idType,
      "deleted": 0,
      "deleted_type": "int",
    },
  });
}

export async function deleteRequest(id: any, tableName?: string) {
  return request<API.Result>(`/api/table/${tableName}/delete/${id}`);
}

export async function softBatchRemoveRequest(params: any[], tableName?: string, idsType?: string,) {
  const ids = params.map(item => (item.id));
  const data = {
    ids: ids,
    "ids_type": idsType,
    "deleted": 1,
    "deleted_type": "int"
  }
  return request<API.Result>(`/api/table/${tableName}/batchUpdate`, {
    method: 'POST',
    data: data
  });
}

export async function softBatchRecoveryRequest(params: any[], tableName?: string, idsType?: string,) {
  const ids = params.map(item => (item.id));
  const data = {
    ids: ids,
    "ids_type": idsType,
    "deleted": 0,
    "deleted_type": "int"
  }
  return request<API.Result>(`/api/table/${tableName}/batchUpdate`, {
    method: 'POST',
    data: data
  });
}

export async function removeRequest(id: string, tableName?: string) {
  return request<API.Result>(`/api/table/${tableName}/delete/${id}`, {
    method: 'GET',
  });
}

export async function softRemoveRequestOfLong(id: string, tableName?: string) {
  return softRemoveRequest(id, tableName, "long");
}

export async function deleteRequestOfLong(id: string, tableName?: string) {
  return deleteRequest(id, tableName);
}

export async function softBatchRemoveRequestOfLong(params: any, tableName?: string) {
  return softBatchRemoveRequest(params, tableName, "long[]");
}

export async function softRecoveryRequestOfLong(id: string, tableName?: string) {
  return softRecoveryRequest(id, tableName, 'long')
}

export async function softBatchRecoveryRequestOfLong(params: any, tableName?: string) {
  return softBatchRecoveryRequest(params, tableName, "long[]");
}
