import React from 'react';
import ApiTableLong from "@/components/common/ApiTableLong";
import {collegeProfessorColumns} from "@/pages/rumi/common/collegeProfessorColumn";
import {collegeProfessorBeforePageRequest} from "@/pages/rumi/common/collegeProfessorService";


const UvaProfessorManagement: React.FC = () => {
  const from = "rumi_uva_professors";
  return (
    <ApiTableLong
      from={from}
      columns={collegeProfessorColumns()}
      beforePageRequest={collegeProfessorBeforePageRequest}
      containsUpload={true}
    />
  );
}

export default UvaProfessorManagement;
