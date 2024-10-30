import {
  createRequest,
  exportAllRequest,
  exportRequest,
  pageRequest,
  softBatchRemoveRequest,
  softRemoveRequest
} from "@/utils/apiTable";

const tableName = "tio_boot_admin_system_images";

export async function pageSystemImages(data: any): Promise<API.Result> {
  return pageRequest(data, tableName)
}

export async function createSystemImages(data: any) {
  return createRequest(data, tableName);
}


export async function removeSystemImages(id: string) {
  return softRemoveRequest(id, tableName);
}

export async function batchRemoveSystemImages(params: any) {
  return softBatchRemoveRequest(params, "long[]", tableName);
}

export async function exportSystemImages(params: any) {
  return exportRequest(params, tableName);
}

export async function exportAllSystemImages(params: any) {
  return exportAllRequest(params, tableName);
}
