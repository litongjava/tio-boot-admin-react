import {
  createRequest,
  exportAllRequest,
  exportRequest,
  pageRequest,
  softBatchRemoveRequest,
  softRemoveRequest
} from "@/utils/apiTable";

const tableName = "tio_boot_admin_system_urls";

export async function pageSystemUrls(data: any): Promise<API.Result> {
  return pageRequest(tableName, data)
}


export async function createSystemUrls(data: any) {
  return createRequest(tableName, data);
}


export async function removeSystemUrls(id: string) {
  return softRemoveRequest(tableName, id);
}

export async function batchRemoveSystemUrls(params: any) {
  return softBatchRemoveRequest(tableName, "long[]", params);
}

export async function exportSystemUrls(params: any) {
  return exportRequest(tableName, params);
}

export async function exportAllSystemUrls(params: any) {
  return exportAllRequest(tableName, params);
}
