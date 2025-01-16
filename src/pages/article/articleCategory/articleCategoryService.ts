import {listRequest} from "@/utils/apiTable";

export const articleCategoryBeforePageRequest = (params: any, isRecoveryMode?: boolean, containsUpload?: boolean) => {
  params.idType = 'long';
  params.remarkOp = "ct";
  params.orderBy = "orders";
  params.update_time_type = "string[]";
  params.update_time_op = "bt";
  params.update_time_to_type = "ISO8601";
  if (containsUpload) {
    params.json_fields = ["files"];
  }

  if (isRecoveryMode) {
    params.deleted = 1
  } else {
    params.deleted = 0
  }

  params.nameOp = "ct";
  return params;
}

export const articleCategoryCreatePageRequest = (params: any, containsUpload?: boolean) => {
  params.ordersType = "int";
  if (containsUpload) {
    params.json_fields = ["files"];
  }
  return params;
}

export async function listArticleCategory(): Promise<API.Result> {
  return listRequest({"columns": "id,name", "orderBy": "orders"}, 'tio_boot_admin_article_category');
}
