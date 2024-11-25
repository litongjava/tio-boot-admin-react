import {createRequest, getRequest} from "@/utils/apiTable";

const tableName = "tio_boot_admin_article";

export async function createSystemArticle(data: any) {
  return createRequest(data, tableName);
}

export async function getArticleById(id: any) {
  return getRequest(id, {idType: 'long'}, tableName);
}

