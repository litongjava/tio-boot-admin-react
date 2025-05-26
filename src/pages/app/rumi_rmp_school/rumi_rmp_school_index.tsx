import ApiTable from '@/components/common/ApiTable';
import { rumi_rmp_school_columns } from '@/pages/app/rumi_rmp_school/rumi_rmp_school_column';

export default () => {
  const from = 'rumi_rmp_school';
  const beforePageRequest = (params: any, isRecoveryMode?: boolean) => {
    params.idType = 'long';

    if (isRecoveryMode) {
      params.deleted = 1;
    } else {
      params.deleted = 0;
    }
    params.remarkOp = 'ct';
    params.orderBy = 'update_time';
    params.isAsc = 'false';
    params.update_time_type = 'string[]';
    params.update_time_op = 'bt';

    params.keyNameOp = 'ct';
    params.keyValueOp = 'ct';

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
      columns={rumi_rmp_school_columns()}
      beforePageRequest={beforePageRequest}
      beforeCreateRequest={beforeCreateRequest}
    />
  );
};
