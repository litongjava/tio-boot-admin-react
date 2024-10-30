import React from 'react';
import {
  batchRemoveSystemUrls,
  createSystemUrls,
  exportAllSystemUrls,
  exportSystemUrls,
  pageSystemUrls,
  removeSystemUrls
} from './systemUrlsService';
import ProDataTable from "@/components/common/ProDataTable";
import {systemUrlsListColumns} from "@/pages/system/urls/systemUrlsColumn";


const SystemUrlsConfigManagement: React.FC = () => {


  const beforePageRequest = (params: any) => {
    params.idType = 'long';
    params.key_nameOp = "ct";
    params.nameOp = "ct";
    params.valueOp = "ct";
    params.remarkOp = "ct";
    params.deleted = 0
    params.deletedLogic = 'or'
    params.orderBy = "update_time";
    params.update_time_type = 'string[]';
    params.update_time_op = 'bt';
    params.isAsc = "false";

    return params;
  }
  const beforeCreateRequest = (formValues: any) => {
    return {
      ...formValues,
      idType: 'long',
    };
  }


  const columns = systemUrlsListColumns();

  return (
    <ProDataTable columns={columns} createRequest={createSystemUrls} deleteRequest={removeSystemUrls}
                  batchRemoveRequest={batchRemoveSystemUrls}
                  pageRequest={pageSystemUrls}
                  exportRequest={exportSystemUrls}
                  exportAllRequest={exportAllSystemUrls}
                  beforePageRequest={beforePageRequest}
                  beforeCreateRequest={beforeCreateRequest}>

    </ProDataTable>

  );
};

export default SystemUrlsConfigManagement;
