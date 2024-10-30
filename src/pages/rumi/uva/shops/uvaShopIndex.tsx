import React from 'react';
import ApiTableLong from "@/components/common/ApiTableLong";
import {collegeShopColumns} from "@/pages/rumi/common/collegeShopColumn";
import {collegeShopBeforePageRequest} from "@/pages/rumi/common/collegeShopService";


const UvaShopManagement: React.FC = () => {
  const from = "rumi_uva_shops";
  return (
    <ApiTableLong
      from={from}
      columns={collegeShopColumns()}
      beforePageRequest={collegeShopBeforePageRequest}
      containsUpload={true}
    />
  );
};

export default UvaShopManagement;
