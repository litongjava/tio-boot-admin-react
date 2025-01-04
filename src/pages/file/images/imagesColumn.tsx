import React from 'react';
import {ProColumns} from '@ant-design/pro-components';
import UploadPreview from "@/components/common/UploadPreview";

export const tio_boot_admin_file_images_columns = (): ProColumns<any>[] => [
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
    "title": "Files",
    "dataIndex": "files",
    "valueType": "text",
    "hideInForm": true,
    search: false,
    render: (_, record) => (
      <UploadPreview
        listType="picture-circle"
        fileList={record.files}
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
