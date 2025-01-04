import {ProColumns} from '@ant-design/pro-components';

export const articleCategoryColumns = (): ProColumns<any>[] => [
  {
    "title": "orders",
    "dataIndex": "orders",
    "valueType": "text"
  },
  {
    "title": "name",
    "dataIndex": "name",
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
