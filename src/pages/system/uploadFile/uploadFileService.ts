import {
  createRequest,
  exportAllRequest,
  exportRequest,
  pageRequest,
  softBatchRemoveRequest,
  softRemoveRequest
} from "@/utils/apiTable";

const tableName = "tio_boot_admin_system_upload_file";

export async function pageSystemUploadFile(data: any): Promise<API.Result> {
  return pageRequest(tableName, data)
}


export async function createSystemUploadFile(data: any) {
  return createRequest(tableName, data);
}


export async function removeSystemUploadFile(id: string) {
  return softRemoveRequest(tableName, id);
}

export async function batchRemoveSystemUploadFile(params: any) {
  return softBatchRemoveRequest(tableName, "long[]", params);
}

export async function exportSystemUploadFile(params: any) {
  return exportRequest(tableName, params);
}

export async function exportAllSystemUploadFile(params: any) {
  return exportAllRequest(tableName, params);
}

