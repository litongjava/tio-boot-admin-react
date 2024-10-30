// @ts-ignore
import {request} from '@umijs/max';
import {download} from "@/utils/downloadUtils";


export async function pageRequest(tableName: string, data: any): Promise<API.Result> {
  return request<API.Result>(`/mongodb/json/${tableName}/page`, {
    method: 'POST',
    data,
  });
}

export async function exportRequest(tableName: string, data: any) {
  // 发送请求并获取响应，注意responseType: 'blob'用于指示响应应该是一个Blob对象
  const response = await request<Blob>(`/mongodb/json/${tableName}/export-excel`, {
    method: 'POST',
    data,
    responseType: 'blob'
  });

  let currentDateString = new Date().toLocaleString();
  let filename = `${tableName}-${currentDateString}.xlsx`;
  download(response, filename);
}


export async function exportAllRequest(tableName: string, data: any) {
  const response = await request<Blob>(`/mongodb/json/${tableName}/export-table-excel`, {
    method: 'POST',
    data,
    responseType: 'blob'
  });
  let currentDateString = new Date().toLocaleString();
  let filename = `${tableName}-all-${currentDateString}.xlsx`;
  download(response, filename);
}


export async function createRequest(tableName: string, data: any) {
  return request<API.Result>(`/mongodb/json/${tableName}/create`, {
    method: 'POST',
    data,
  });
}

export async function getByIdRequest(tableName: string, id: any, params?: any) {
  return request<API.Result>(`/mongodb/json/${tableName}/get`, {
    method: 'POST',
    data: {
      id: id,
      ...params
    },
  });
}

export async function updateRequest(tableName: string, data: any) {
  return request<API.Result>(`/mongodb/json/${tableName}/update`, {
    method: 'POST',
    data,
  });
}

export async function softRemoveRequest(tableName: string, id: any, idType?: any) {
  return request<API.Result>(`/mongodb/json/${tableName}/update`, {
    method: 'POST',
    data: {
      id: id,
      idType: idType,
      "deleted": 1,
      "deleted_type": "int",
    },
  });
}

export async function softBatchRemoveRequest(tableName: string, idsType: string, params: any[]) {
  const ids = params.map(item => (item.id));
  const data = {
    ids: ids,
    "ids_type": idsType,
    "deleted": 1,
    "deleted_type": "int"
  }
  return request<API.Result>(`/mongodb/json/${tableName}/batchUpdate`, {
    method: 'POST',
    data: data
  });
}


export async function removeRequest(tableName: string, id: string) {
  return request<API.Result>(`/mongodb/json/${tableName}/delete/${id}`, {
    method: 'GET',
  });
}


