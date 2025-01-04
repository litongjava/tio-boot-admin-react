import {ProColumns} from '@ant-design/pro-components';

export const tio_boot_admin_system_constants_config_columns = (): ProColumns<any>[] => [
  {
    title: 'Key Name',
    dataIndex: 'key_name',
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
    title: 'Key Value',
    dataIndex: 'key_value',
    valueType: "textarea",
    ellipsis:true,
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
