import React from 'react';
import {ProColumns} from '@ant-design/pro-components';
import {Upload} from "antd";

export const systemPdfColumns = (): ProColumns<any>[] => [
  {
    "title": "Name",
    "dataIndex": "name",
    "valueType": "text",
    formItemProps(form) {
      return {
        rules: [
          {
            required: true,
          },
        ],
      };
    },
  },
  {
    "title": "Version",
    "dataIndex": "version",
    "valueType": "text",
    formItemProps(form) {
      return {
        rules: [
          {
            required: true,
          },
        ],
      };
    },
  },
  {
    "title": "Urls",
    "dataIndex": "urls",
    "valueType": "text",
    "hideInForm": true,
    search: false,
    render: (_, record) => (
      <Upload
        listType="text"
        fileList={record.urls}
        showUploadList={{
          showRemoveIcon: false,
          showPreviewIcon: true
        }}
      />
    ),
  },
  {
    "title": "Remark",
    "dataIndex": "remark",
    "valueType": "text",
  },
  {
    "title": "Update Time",
    "dataIndex": "update_time",
    valueType: "dateTime",
    "hideInForm": true
  },
];
