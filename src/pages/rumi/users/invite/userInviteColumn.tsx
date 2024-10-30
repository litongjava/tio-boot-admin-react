import {ProColumns} from '@ant-design/pro-components';

export const userInviteColumns = (): ProColumns<any>[] => [
  {
    "title": "code",
    "dataIndex": "code",
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
    "title": "user_id",
    "dataIndex": "user_id",
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
    title: "ip",
    dataIndex: "ip",
    valueType: "text",
  },
  {
    title: "ip_region",
    dataIndex: "ip_region",
    valueType: "text",
  },
  {
    title: "user_agent",
    dataIndex: "user_agent",
    valueType: "text",
    ellipsis: true,
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
