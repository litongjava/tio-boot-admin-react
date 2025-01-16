import {ProColumns} from '@ant-design/pro-components';
import UploadPreview from "@/components/common/UploadPreview";

export const tio_boot_admin_article_author_columns = (): ProColumns<any>[] => [
  {
    title: 'Name',
    dataIndex: 'name',
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
    title: 'Dept',
    dataIndex: 'dept',
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
