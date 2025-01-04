import {ProColumns} from '@ant-design/pro-components';
import UploadPreview from "@/components/common/UploadPreview";

export const systemArticleListColumns = (): ProColumns<any>[] => [
  {
    title: 'Title',
    dataIndex: 'title',
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
    title: 'content',
    dataIndex: 'content',
    valueType: "textarea",
    ellipsis: true,
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
    title: 'category_id',
    dataIndex: 'category_id',
  },
  {
    title: 'tags',
    dataIndex: 'tags',
  },
  {
    title: 'views',
    dataIndex: 'views',
  },
  {
    title: 'visibility',
    dataIndex: 'visibility',
  },
  {
    title: "Files",
    dataIndex: "files",
    valueType: "text",
    hideInForm: true,
    search: false,
    render: (_, record) => <UploadPreview listType="picture-circle" fileList={record.files} />,
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
  },
];
