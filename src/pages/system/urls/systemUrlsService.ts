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
  return pageRequest(data, tableName)
}


export async function createSystemUrls(data: any) {
  return createRequest(data, tableName);
}


export async function removeSystemUrls(id: string) {
  return softRemoveRequest(id, tableName);
}

export async function batchRemoveSystemUrls(params: { id: string | number }[]) {
  return softBatchRemoveRequest(params, tableName, "long[]");
}

export async function exportSystemUrls(params: any) {
  return exportRequest(params, tableName);
}

export async function exportAllSystemUrls(params: any) {
  return exportAllRequest(params, tableName);
}
