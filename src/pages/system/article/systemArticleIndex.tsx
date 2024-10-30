import React from 'react';
import ProDataTable from "@/components/common/ProDataTable";
import {systemArticleListColumns} from "@/pages/system/article/systemArticleColumn";
import {
  batchRemoveSystemArticle,
  createSystemArticle,
  exportAllSystemArticle,
  exportSystemArticle,
  pageSystemArticle,
  removeSystemArticle
} from './systemArticleService';
import {useNavigate} from 'umi';

const SystemArticleManagement: React.FC = () => {
  let navigate = useNavigate();

  const beforePageRequest = (params: any) => {
    params.idType = 'long';
    params.titleOp = "ct";
    params.contentOp = "ct";
    params.remarkOp = "ct";
    params.deleted = 0
    params.orderBy = "update_time";
    params.update_time_type = 'string[]';
    params.update_time_op = 'bt';
    params.isAsc = "false";

    return params;
  }
  const beforeCreateRequest = (formValues: any) => {
    return {
      ...formValues,
      idType: 'long',
    };
  }


  const editContentAndPreview = {
    title: 'Edit',
    valueType: 'option',
    width: 200,
    render: (text: any, record: any) => [
      <a key="editContent" onClick={() => navigate("/system/newArticle/" + record.id, {replace: true})}>
        Edit Content
      </a>,
      <a key="preView" onClick={() => navigate("/article/" + record.id, {replace: true})}>
        Preview
      </a>,
    ],
  };

  const columns = [...systemArticleListColumns(), editContentAndPreview];

  return (
    <ProDataTable columns={columns} createRequest={createSystemArticle} deleteRequest={removeSystemArticle}
                  batchRemoveRequest={batchRemoveSystemArticle}
                  pageRequest={pageSystemArticle}
                  exportRequest={exportSystemArticle}
                  exportAllRequest={exportAllSystemArticle}
                  beforePageRequest={beforePageRequest}
                  beforeCreateRequest={beforeCreateRequest}>

    </ProDataTable>

  );
};

export default SystemArticleManagement;
