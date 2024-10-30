import React from 'react';
import {collegeShopBeforePageRequest} from "@/pages/rumi/common/collegeShopService";
import {collegeShopColumns} from "@/pages/rumi/common/collegeShopColumn";
import ApiTableLong from "@/components/common/ApiTableLong";


const SjsuShopManagement: React.FC = () => {
  const from = "rumi_sjsu_shops";
  return (
    <ApiTableLong
      from={from}
      columns={collegeShopColumns()}
      beforePageRequest={collegeShopBeforePageRequest}
      containsUpload={true}
    />
  );
};

export default SjsuShopManagement;
