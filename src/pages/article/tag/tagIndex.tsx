import React from 'react';
import ApiTable from '@/components/common/ApiTable';
import { tio_boot_admin_article_tag_columns } from '@/pages/article/tag/tagColumn';

export default () => {
  const from = 'tio_boot_admin_article_tag';

  const beforePageRequest = (params: any, isRecoveryMode?: boolean, containsUpload?: boolean) => {
    params.idType = 'long';
    if (containsUpload) {
      params.json_fields = ['files'];
    }
    params.deleted = isRecoveryMode ? 1 : 0;

    params.titleOp = 'ct';
    params.contentOp = 'ct';
    params.remarkOp = 'ct';

    params.orderBy = 'update_time';
    params.update_time_type = 'string[]';
    params.update_time_op = 'bt';
    params.isAsc = 'false';

    return params;
  };
  const beforeCreateRequest = (formValues: any) => {
    return {
      ...formValues,
      idType: 'long',
    };
  };

  return (
    <ApiTable
      from={from}
      columns={tio_boot_admin_article_tag_columns()}
      beforePageRequest={beforePageRequest}
      beforeCreateRequest={beforeCreateRequest}
    />
  );
};
