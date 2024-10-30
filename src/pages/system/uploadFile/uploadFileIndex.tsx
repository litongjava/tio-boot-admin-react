import React from 'react';
import {
  batchRemoveSystemUploadFile,
  createSystemUploadFile,
  exportAllSystemUploadFile,
  pageSystemUploadFile,
  removeSystemUploadFile
} from './uploadFileService';
import ProDataTable from "@/components/common/ProDataTable";
import {systemUploadFileListColumns} from "@/pages/system/uploadFile/uploadFileColumn";

const SystemUploadFileManagement: React.FC = () => {


  const beforePageRequest = (params: any) => {
    params.idType = 'long';
    params.md5Op = "ct";
    params.filenameOp = "ct";
    params.target_nameOp = "ct";
    params.deleted = 0
    //params.orderBy = "create_time";
    params.orderBy = "update_time";
    return params;
  }
  const beforeCreateRequest = (formValues: any) => {
    return {
      ...formValues,
      idType: 'long',
    };
  }


  const columns = systemUploadFileListColumns();

  return (
    <ProDataTable columns={columns} createRequest={createSystemUploadFile}
                  deleteRequest={removeSystemUploadFile}
                  batchRemoveRequest={batchRemoveSystemUploadFile}
                  pageRequest={pageSystemUploadFile}
                  exportRequest={exportAllSystemUploadFile}
                  exportAllRequest={exportAllSystemUploadFile}
                  beforePageRequest={beforePageRequest}
                  beforeCreateRequest={beforeCreateRequest}>
    </ProDataTable>

  );
};

export default SystemUploadFileManagement;
