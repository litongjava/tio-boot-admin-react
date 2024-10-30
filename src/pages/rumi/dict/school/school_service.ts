import {listRequest} from "@/utils/apiTable";

export const schoolDictBeforePageRequest = (params: any, isRecoveryMode?: boolean, containsUpload?: boolean) => {
  params.idType = 'long';
  params.remarkOp = "ct";
  params.orderBy="id";
  params.update_time_type = "string[]";
  params.update_time_op = "bt";
  params.update_time_to_type = "ISO8601";

  if (isRecoveryMode) {
    params.deleted = 1
  } else {
    params.deleted = 0
  }


  params.nameOp = "ct";


  return params;
}

export const schoolDictBeforeCreateRequest = (params: any, containsUpload?: boolean) => {
  return params;
}

export async function listSchoolDict(): Promise<API.Result> {
  return listRequest({"columns": "id,full_name as name", "orderBy": "id"}, 'rumi_school_dict');
}
