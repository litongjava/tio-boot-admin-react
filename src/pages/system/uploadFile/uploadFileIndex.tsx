import React from "react";
import ApiTable from "@/components/common/ApiTable";
import {systemUploadFileListColumns} from "@/pages/system/uploadFile/uploadFileColumn";

export default () => {
  const from = "tio_boot_admin_system_upload_file";

  const beforePageRequest = (params: any) => {
    params.idType = "long";
    params.keyNameOp = "ct";
    params.keyValueOp = "ct";
    params.remarkOp = "ct";
    params.deleted = 0;
    params.orderBy = "update_time";
    params.isAsc = "false";
    params.update_time_type = "string[]";
    params.update_time_op = "bt";
    return params;
  };

  const beforeCreateRequest = (formValues: any) => {
    return {
      ...formValues,
      idType: "long",
    };
  };

  return (
    <ApiTable
      from={from}
      columns={systemUploadFileListColumns()}
      beforePageRequest={beforePageRequest}
      beforeCreateRequest={beforeCreateRequest}
    />
  );
};
