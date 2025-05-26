import React from "react";
import ApiTable from "@/components/common/ApiTable";
import {tio_boot_admin_file_images_columns} from "@/pages/file/images/imagesColumn";
import {beforeImageCreateRequest, beforeImagePageRequest} from "@/pages/file/images/imagesService";

export default () => {
  const from = "tio_boot_admin_file_images";
  return (
    <ApiTable
      from={from}
      columns={tio_boot_admin_file_images_columns()}
      beforePageRequest={beforeImagePageRequest}
      beforeCreateRequest={beforeImageCreateRequest}
      containsUpload={true}
      maxFiles={1}
      uploadCategory="images"
    />
  );
};
