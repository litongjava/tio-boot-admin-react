import {ProColumns} from '@ant-design/pro-components';

export const access_log_columns = (): ProColumns<any>[] => [
  {
    title: 'channel_id',
    dataIndex: 'channel_id',
    ellipsis:true,
    copyable:true
  },
  {
    title: 'ip',
    dataIndex: 'ip',
    ellipsis:true,
    copyable:true
  },
  {
    title: 'user_id',
    dataIndex: 'user_id',
    ellipsis:true,
    copyable:true
  },
  {
    title: 'method',
    dataIndex: 'method',
  },
  {
    title: 'uri',
    dataIndex: 'uri',
    copyable:true
  },
  {
    title: 'user_agent',
    dataIndex: 'user_agent',
    ellipsis:true,
    copyable:true
  },
  {
    title: 'header',
    dataIndex: 'header',
    ellipsis:true,
    copyable:true
  },
  {
    title: 'body',
    dataIndex: 'body',
    ellipsis:true,
    copyable:true
  },
  {
    title: 'Remark',
    dataIndex: 'remark',
  },
  {
    title: 'update_time',
    dataIndex: 'update_time',
    valueType: 'dateTime',
    hideInSearch: true,
    hideInForm: true,
  },
  {
    key: 'update_time',
    title: 'update_time',
    dataIndex: 'update_time_range',
    valueType: 'dateTimeRange',
    hideInTable: true,
    hideInForm: true,
    hideInDescriptions: true,
  },
];
