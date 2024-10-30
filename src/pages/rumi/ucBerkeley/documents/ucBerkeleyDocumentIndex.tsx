import React from 'react';
import ApiTableLong from "@/components/common/ApiTableLong";
import {collegeDocumentBeforePageRequest} from "@/pages/rumi/common/collegeDocumentService";
import {collegeDocumentColumns} from "@/pages/rumi/common/collegeDocumentColumn";

const UcBerkeleyDocumentManagement: React.FC = () => {
  const from = "rumi_uc_berkeley_documents";
  return (
    <ApiTableLong
      from={from}
      columns={collegeDocumentColumns()}
      beforePageRequest={collegeDocumentBeforePageRequest}
      containsUpload={false}
    />
  );

};

export default UcBerkeleyDocumentManagement;
