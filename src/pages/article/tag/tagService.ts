import { listRequest } from '@/utils/apiTable';

const tableName = 'tio_boot_admin_article_tag';

export async function listArticleTag(): Promise<API.Result> {
  return listRequest({ columns: 'id,name', orderBy: 'id' }, tableName);
}
