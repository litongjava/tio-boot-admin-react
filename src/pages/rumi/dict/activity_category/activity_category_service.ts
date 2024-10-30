import {listRequest} from "@/utils/apiTable";

export const activityCategoryBeforePageRequest = (params: any, isRecoveryMode?: boolean, containsUpload?: boolean) => {
  params.idType = 'long';
  params.remarkOp = "ct";
  params.orderBy = "update_time";
  params.update_time_type = "string[]";
  params.update_time_op = "bt";
  params.update_time_to_type = "ISO8601";
  params.isAsc = "false";

  if (isRecoveryMode) {
    params.deleted = 1
  } else {
    params.deleted = 0
  }


  params.nameOp = "ct";

  return params;
}

export const activityCategoryBeforeCreateRequest = (params: any, containsUpload?: boolean) => {
  return params;
}

export async function listActivityCategory(): Promise<API.Result> {
  return listRequest({"columns": "id,name", "orderBy": "id"}, 'rumi_sjsu_activity_category');
}
