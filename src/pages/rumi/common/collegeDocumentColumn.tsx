import React from 'react';
import {ProColumns} from '@ant-design/pro-components';
import UploadImagePreview from "@/components/common/UploadImagePreview";

export const collegeDocumentColumns = (): ProColumns<any>[] => [
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
    "title": "Description",
    "dataIndex": "description",
    "valueType": "textarea",
    ellipsis: true,
  },
  {
    "title": "Url",
    "dataIndex": "url",
    "valueType": "text",
  },
  {
    title: "Files",
    dataIndex: "files",
    valueType: "text",
    hideInForm: true,
    search: false,
    render: (_, record) => (
      <UploadImagePreview
        listType="picture-circle"
        fileList={record.files}
      />
    ),
  },
  {
    title: "Remark",
    dataIndex: "remark",
    valueType: "text",
  },
  {
    title: 'Update Time',
    dataIndex: 'update_time',
    valueType: 'dateTime',
    hideInSearch: true,
    hideInForm: true,
  },
  {
    title: 'Update Time',
    key: 'update_time',
    dataIndex: 'update_time_range',
    valueType: 'dateTimeRange',
    hideInTable: true,
    hideInForm: true,
    hideInDescriptions: true,
  },
];
