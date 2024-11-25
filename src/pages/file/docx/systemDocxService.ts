import {
  createRequest,
  pageRequest,
  softRemoveRequest,
  softBatchRemoveRequest,
  exportRequest, exportAllRequest, getRequest
} from "@/utils/apiTable";

const tableName = "tio_boot_admin_system_docx";

export async function pageSystemDocx(data: any): Promise<API.Result> {
  return pageRequest(data, tableName)
}


export async function createSystemDocx(data: any) {
  return createRequest(data, tableName);
}


export async function removeSystemDocx(id: string) {
  return softRemoveRequest(id, tableName);
}

export async function batchRemoveSystemDocx(params: any) {
  return softBatchRemoveRequest(params, "long[]", tableName);
}

export async function getDocxById(id: any) {
  return getRequest(id, {
    idType: 'long',
    jsonFields: ["urls"],
    jsonFields_type: 'string[]'
  }, tableName);
}


export async function exportSystemDocx(params: any) {
  return exportRequest(params, tableName);
}

export async function exportAllSystemDocx(params: any) {
  return exportAllRequest(params, tableName);
}
