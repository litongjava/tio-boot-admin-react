import type { ProColumns } from '@ant-design/pro-components';
import { Link } from '@umijs/max';

export const addListColumns = (
  columns: ProColumns<any>[],
  handleShowDetailDraw: (record: any) => void,
  handleRemove: (id: string) => Promise<void>,
  handleDelete: (id: string) => Promise<void>,
  handleShowEditModal: (record: any) => void,
  recoveryMode?: boolean,
  from?: string,
): ProColumns<any>[] => [
  {
    title: 'Id',
    dataIndex: 'id',
    copyable: true,
    ellipsis: true,
    width: 70,
    // fixed: 'left',
    render: (dom, entity) => {
      return <a onClick={() => handleShowDetailDraw(entity)}>{dom}</a>;
    },
  },
  ...columns,
  {
    title: 'Operation',
    valueType: 'option',
    width: 150,
    // fixed: 'right',
    render: (text, record) => [
      <a key="edit" onClick={() => handleShowEditModal(record)}>
        Edit
      </a>,
      <a key="delete" onClick={() => handleRemove(record.id)}>
        {recoveryMode ? 'Recovery' : 'Remove'}
      </a>,
      <Link key="details" target="_blank" to={`/details/${from}/${record.id}`}>
        Details
      </Link>,
      recoveryMode && (
        <a key="Delete" onClick={() => handleDelete(record.id)}>
          Delete
        </a>
      ),
    ],
  },
];
