import React from 'react';
import ApiTableLong from "@/components/common/ApiTableLong";
import {
  collegeActivityBeforeCreateRequest,
  collegeActivityBeforePageRequest
} from "@/pages/rumi/common/collegeActivityService";
import {collegeActivityColumns} from "@/pages/rumi/common/collegeActivityColumn";


export default () => {
  const from = "rumi_stanford_activity";
  return (
    <ApiTableLong
      from={from}
      columns={collegeActivityColumns()}
      beforePageRequest={collegeActivityBeforePageRequest}
      beforeCreateRequest={collegeActivityBeforeCreateRequest}
      containsUpload={true}
    />
  );
};


