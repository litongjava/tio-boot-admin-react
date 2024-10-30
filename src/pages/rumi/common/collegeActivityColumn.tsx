import React from 'react';
import {ProColumns, ProFormDateTimePicker} from '@ant-design/pro-components';
import UploadImagePreview from "@/components/common/UploadImagePreview";

export const collegeActivityColumns = (): ProColumns<any>[] => [
  {
    "title": "Category Id",
    "dataIndex": "category_id",
    "valueType": "text",
  },
  {
    "title": "Title",
    "dataIndex": "title",
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
    title: 'Start Time',
    dataIndex: 'start_time',
    valueType: 'dateTime',
    hideInSearch: true,
    renderFormItem: (item, {defaultRender, ...rest}, form) => {
      if (form) {
        return (
          <ProFormDateTimePicker fieldProps={{
            onChange: (date, dateString) => {
              if (date) {
                const timestamp = date.valueOf();
                let params = {start_time: timestamp};
                form.setFieldsValue(params);
              } else {
                form.setFieldsValue({start_time: null});
              }
            },
          }}
          />
        );
      }
      return defaultRender(item);
    },
  },
  {
    title: 'Start Time',
    key: 'start_time',
    dataIndex: 'start_time_range',
    valueType: 'dateTimeRange',
    hideInTable: true,
    hideInForm: true,
    hideInDescriptions: true,
  },
  {
    title: 'End Time',
    dataIndex: 'end_time',
    valueType: 'dateTime',
    hideInSearch: true,
    renderFormItem: (item, {defaultRender, ...rest}, form) => {
      if (form) {
        return (
          <ProFormDateTimePicker fieldProps={{
            onChange: (date, dateString) => {
              if (date) {
                const timestamp = date.valueOf();
                let params = {end_time: timestamp};
                form.setFieldsValue(params);
              } else {
                form.setFieldsValue({end_time: -1});
              }
            },
          }}
          />
        );
      }
      return defaultRender(item);
    },
  },
  {
    title: 'End Time',
    key: 'end_time',
    dataIndex: 'end_time_range',
    valueType: 'dateTimeRange',
    hideInTable: true,
    hideInForm: true,
    hideInDescriptions: true,
  },
  {
    "title": "Organization",
    "dataIndex": "organization",
    "valueType": "text",
  },
  {
    "title": "location",
    "dataIndex": "location",
    "valueType": "text",
  },
  {
    "title": "link",
    "dataIndex": "link",
    "valueType": "text",
  },
  {
    "title": "Description",
    "dataIndex": "description",
    "valueType": "textarea",
    ellipsis: true,
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
    title: "State",
    dataIndex: "state",
    valueType: "text",
  },
  {
    title: "Status",
    dataIndex: "status",
    valueType: "text",
  },
  {
    "title": "Creator",
    "dataIndex": "creator",
    "valueType": "text",
    hideInForm: true,
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


export const collegeActivityParams = {
  json_fields: ["files"],
  json_fields_type: 'string[]',
}
