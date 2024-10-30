import React from 'react';
import {collegeProfessorBeforePageRequest} from "@/pages/rumi/common/collegeProfessorService";
import {collegeProfessorColumns} from "@/pages/rumi/common/collegeProfessorColumn";
import ApiTableLong from "@/components/common/ApiTableLong";

const UcBerkeleyProfessorManagement: React.FC = () => {
  const from = "rumi_uc_berkeley_professors";
  return (
    <ApiTableLong
      from={from}
      columns={collegeProfessorColumns()}
      beforePageRequest={collegeProfessorBeforePageRequest}
      containsUpload={true}
    />
  );
};

export default UcBerkeleyProfessorManagement;
