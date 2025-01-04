import {ProColumns} from '@ant-design/pro-components';

export const systemUploadFileListColumns = (): ProColumns<any>[] => [
  {
    title: 'md5',
    dataIndex: 'md5',
  },
  {
    title: 'name',
    dataIndex: 'name',
  },
  {
    title: 'size',
    dataIndex: 'size',
  },
  {
    title: 'user_id',
    dataIndex: 'user_id',
  },
  {
    title: 'platform',
    dataIndex: 'platform',
  },
  {
    title: 'region_name',
    dataIndex: 'region_name',
  },
  {
    title: 'bucket_name',
    dataIndex: 'bucket_name',
  },
  {
    title: 'file_id',
    dataIndex: 'file_id',
  },
  {
    title: 'target_name',
    dataIndex: 'target_name',
  },
  {
    title: 'tags',
    dataIndex: 'tags',
    ellipsis: true,
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
