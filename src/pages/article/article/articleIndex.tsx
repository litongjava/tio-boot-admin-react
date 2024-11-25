import React from 'react';
import {systemArticleListColumns} from "@/pages/article/article/articleColumn";
// @ts-ignore
import {useNavigate} from 'umi';
import ApiTableLong from "@/components/common/ApiTableLong";

export default () => {
  const from = "tio_boot_admin_article";
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
      <a key="editContent" onClick={() => navigate("/article/create/" + record.id, {replace: true})}>
        Edit Content
      </a>,
      <a key="preView" onClick={() => navigate("/article/" + record.id, {replace: true})}>
        Preview
      </a>,
    ],
  };

  const columns = [...systemArticleListColumns(), editContentAndPreview];

  return (
    <ApiTableLong
      from={from}
      columns={columns}
      beforePageRequest={beforePageRequest}
      beforeCreateRequest={beforeCreateRequest}
    />
  );
};
