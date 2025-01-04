import {
  createRequest,
  pageRequest,
  softRemoveRequest,
  softBatchRemoveRequest,
  exportRequest, exportAllRequest, getRequest
} from "@/utils/apiTable";

const tableName = "tio_boot_admin_system_pdf";

export async function pageSystemPdf(data: any): Promise<API.Result> {
  return pageRequest(data, tableName)
}


export async function createSystemPdf(data: any) {
  return createRequest(data, tableName);
}


export async function removeSystemPdf(id: string) {
  return softRemoveRequest(id, tableName);
}

export async function batchRemoveSystemPdf(params: any) {
  return softBatchRemoveRequest(params, "long[]", tableName);
}

export async function getPdfById(id: any) {
  return getRequest(id, {
    idType: 'long',
    jsonFields: ["urls"],
    jsonFields_type: 'string[]'
  }, tableName);
}


export async function exportSystemPdf(params: any) {
  return exportRequest(tableName, params);
}

export async function exportAllSystemPdf(params: any) {
  return exportAllRequest(tableName, params);
}
