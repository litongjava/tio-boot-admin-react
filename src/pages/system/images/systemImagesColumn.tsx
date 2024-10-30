import React from 'react';
import {ProColumns} from '@ant-design/pro-components';
import UploadImagePreview from "@/components/common/UploadImagePreview";

export const systemImagesColumns = (): ProColumns<any>[] => [
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
    "title": "category",
    "dataIndex": "category",
    "valueType": "text",
  },
  {
    "title": "Urls",
    "dataIndex": "urls",
    "valueType": "text",
    "hideInForm": true,
    search: false,
    render: (_, record) => (
      <UploadImagePreview
        listType="picture-circle"
        fileList={record.urls}
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
