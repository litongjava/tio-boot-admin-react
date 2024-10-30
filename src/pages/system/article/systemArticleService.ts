import {
  createRequest,
  exportAllRequest,
  exportRequest,
  getRequest,
  pageRequest,
  softBatchRemoveRequest,
  softRemoveRequest
} from "@/utils/apiTable";

const tableName = "tio_boot_admin_system_article";

export async function pageSystemArticle(data: any): Promise<API.Result> {
  return pageRequest(data, tableName)
}


export async function createSystemArticle(data: any) {
  return createRequest(data, tableName);
}


export async function removeSystemArticle(id: string) {
  return softRemoveRequest(id, 'long', tableName);
}

export async function batchRemoveSystemArticle(params: any) {
  return softBatchRemoveRequest(params, "long[]", tableName);
}

export async function getArticleById(id: any) {
  return getRequest(id, {idType: 'long'}, tableName);
}


export async function exportSystemArticle(params: any) {
  return exportRequest(params, tableName);
}

export async function exportAllSystemArticle(params: any) {
  return exportAllRequest(params, tableName);
}

