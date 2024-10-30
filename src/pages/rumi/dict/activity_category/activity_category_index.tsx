import React from 'react';
import ApiTableLong from "@/components/common/ApiTableLong";
import {activityCategoryColumns} from "@/pages/rumi/dict/activity_category/activity_category_column";
import {activityCategoryBeforePageRequest} from "@/pages/rumi/dict/activity_category/activity_category_service";


export default () => {
  const from = "rumi_sjsu_activity_category";
  return (
    <ApiTableLong
      from={from}
      columns={activityCategoryColumns()}
      beforePageRequest={activityCategoryBeforePageRequest}
      containsUpload={false}
    />
  );
};
