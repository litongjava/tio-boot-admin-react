import React from 'react';
import ApiTable from '@/components/common/ApiTable';
import { access_log_columns } from '@/pages/system/access_log/access_log_column';

export default () => {
  const from = 'tio_boot_admin_article_access_log';

  const beforePageRequest = (params: any) => {
    params.idType = 'long';
    params.user_agent_op = 'ct';
    params.ip_op = 'ct';
    params.remarkOp = 'ct';
    params.deleted = 0;
    params.orderBy = 'id';
    params.isAsc = false;
    params.update_time_type = 'string[]';
    params.update_time_op = 'bt';
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
      columns={access_log_columns()}
      beforePageRequest={beforePageRequest}
      beforeCreateRequest={beforeCreateRequest}
    />
  );
};
