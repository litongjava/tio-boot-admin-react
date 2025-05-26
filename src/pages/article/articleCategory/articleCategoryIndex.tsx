import React from 'react';
import {
  articleCategoryBeforePageRequest,
  articleCategoryCreatePageRequest
} from "@/pages/article/articleCategory/articleCategoryService";
import ApiTable from "@/components/common/ApiTable";
import {articleCategoryColumns} from "@/pages/article/articleCategory/articleCategoryColumn";


export default () => {
  const from = "tio_boot_admin_article_category";
  return (
    <ApiTable
      from={from}
      columns={articleCategoryColumns()}
      beforePageRequest={articleCategoryBeforePageRequest}
      beforeCreateRequest={articleCategoryCreatePageRequest}
    />
  );
};
