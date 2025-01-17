import UploadPreview from '@/components/common/UploadPreview';
import { ProColumns } from '@ant-design/pro-components';

export const systemArticleListColumns = (): ProColumns<any>[] => [
  {
    title: 'Title',
    dataIndex: 'title',
    copyable: true,
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
    title: 'Summary',
    dataIndex: 'summary',
    ellipsis: true,
  },
  {
    title: 'Draft',
    dataIndex: 'draft',
  },
  {
    title: 'Visibility',
    dataIndex: 'visibility',
    valueType: 'select',
    fieldProps: {
      options: [
        { label: 'public', value: 'public' },
        { label: 'private', value: 'private' },
      ],
    },
  },
  {
    title: 'Views',
    dataIndex: 'views',
  },
  {
    title: 'Files',
    dataIndex: 'files',
    valueType: 'text',
    hideInForm: true,
    search: false,
    render: (_, record) => <UploadPreview listType="picture-circle" fileList={record.files} />,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    valueType: 'dateTime',
    hideInSearch: true,
  },
  {
    key: 'date',
    title: 'Date',
    dataIndex: 'date_range',
    valueType: 'dateTimeRange',
    hideInTable: true,
    hideInForm: true,
  },
  {
    title: 'Lastmod',
    dataIndex: 'lastmod',
    valueType: 'dateTime',
    hideInSearch: true,
  },
  {
    key: 'lastmod',
    title: 'Lastmod',
    dataIndex: 'lastmod_range',
    valueType: 'dateTimeRange',
    hideInTable: true,
    hideInForm: true,
  },
  {
    title: 'Remark',
    dataIndex: 'remark',
  },
  {
    title: 'Update Time',
    dataIndex: 'update_time',
    valueType: 'dateTime',
    hideInSearch: true,
    hideInForm: true,
  },
  {
    key: 'update_time',
    title: 'Update Time',
    dataIndex: 'update_time_range',
    valueType: 'dateTimeRange',
    hideInTable: true,
    hideInForm: true,
  },
];
