import React from 'react';
import ApiTableLong from "@/components/common/ApiTableLong";
import {schoolColumns} from "@/pages/rumi/dict/school/school_column";
import {schoolDictBeforeCreateRequest, schoolDictBeforePageRequest} from "@/pages/rumi/dict/school/school_service";


export default () => {
  const from = "rumi_school_dict";
  return (
    <ApiTableLong
      from={from}
      columns={schoolColumns()}
      beforePageRequest={schoolDictBeforePageRequest}
      beforeCreateRequest={schoolDictBeforeCreateRequest}
      containsUpload={false}
    />
  );
};


