import React from 'react';
import ApiTableLong from "@/components/common/ApiTableLong";
import {collegeDocumentColumns} from "@/pages/rumi/common/collegeDocumentColumn";
import {collegeDocumentBeforePageRequest} from "@/pages/rumi/common/collegeDocumentService";


const UvaDocumentManagement: React.FC = () => {
  const from = "rumi_uva_documents";
  return (
    <ApiTableLong
      from={from}
      columns={collegeDocumentColumns()}
      beforePageRequest={collegeDocumentBeforePageRequest}
      containsUpload={false}
    />
  );

};

export default UvaDocumentManagement;
