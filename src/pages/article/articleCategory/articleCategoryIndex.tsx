import React from 'react';
import {
  articleCategoryBeforePageRequest,
  articleCategoryCreatePageRequest
} from "@/pages/article/articleCategory/articleCategoryService";
import ApiTableLong from "@/components/common/ApiTableLong";
import {articleCategoryColumns} from "@/pages/article/articleCategory/articleCategoryColumn";


export default () => {
  const from = "tio_boot_admin_article_category";
  return (
    <ApiTableLong
      from={from}
      columns={articleCategoryColumns()}
      beforePageRequest={articleCategoryBeforePageRequest}
      beforeCreateRequest={articleCategoryCreatePageRequest}
    />
  );
};
