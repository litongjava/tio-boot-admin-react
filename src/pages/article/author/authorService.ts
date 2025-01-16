import { listRequest } from '@/utils/apiTable';

const tableName = 'tio_boot_admin_article_author';

export async function listArticleAuthor(): Promise<API.Result> {
  return listRequest({ columns: 'id,name', orderBy: 'id' }, tableName);
}
