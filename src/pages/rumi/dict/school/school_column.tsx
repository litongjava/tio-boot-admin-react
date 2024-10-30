import {ProColumns} from '@ant-design/pro-components';

export const schoolColumns = (): ProColumns<any>[] => [
  {
    "title": "Rmp School Id",
    "dataIndex": "rmp_school_id",
    "valueType": "text"
  },
  {
    "title": "Full Name",
    "dataIndex": "full_name",
    "valueType": "text"
  },
  {
    "title": "Abbr Name",
    "dataIndex": "abbr_name",
    "valueType": "text"
  },
  {
    "title": "Bot Name",
    "dataIndex": "bot_name",
    "valueType": "text"
  },
  {
    title: "Remark",
    dataIndex: "remark",
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
