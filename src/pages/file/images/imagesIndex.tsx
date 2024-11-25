import React from "react";
import ApiTableLong from "@/components/common/ApiTableLong";
import {tio_boot_admin_file_images_columns} from "@/pages/file/images/imagesColumn";
import {beforeImageCreateRequest, beforeImagePageRequest} from "@/pages/file/images/imagesService";

export default () => {
  const from = "tio_boot_admin_file_images";
  return (
    <ApiTableLong
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
