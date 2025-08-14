import { DeleteOutlined, EditOutlined, ExportOutlined, RollbackOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { Link } from '@umijs/max';
import { Tooltip } from 'antd';

export const addListColumns = (
  columns: ProColumns<any>[],
  from?: string,
  handleShowDetailDraw?: (record: any) => void,
  handleRemove?: (id: string) => Promise<void>,
  handleDelete?: (id: string) => Promise<void>,
  handleShowEditModal?: (record: any) => void,
  recoveryMode?: boolean,
  editable?: boolean,
  removable?: boolean,
  viewable?: boolean,
): ProColumns<any>[] => {
  return [
    {
      title: 'Id',
      dataIndex: 'id',
      copyable: true,
      ellipsis: true,
      width: 70,
      // fixed: 'left',
      render: (dom, entity) => {
        return (
          <a onClick={() => (handleShowDetailDraw ? handleShowDetailDraw(entity) : {})}>{dom}</a>
        );
      },
    },
    ...columns,
    {
      title: 'Operation',
      valueType: 'option',
      // fixed: 'right',
      render: (text, record) => {
        let buttons = [];
        if (editable) {
          if (handleShowEditModal) {
            buttons.push(
              <Tooltip title="Edit">
                <a key="edit" onClick={() => handleShowEditModal(record)}>
                  <EditOutlined />
                </a>
              </Tooltip>,
            );
          }
        }

        if (removable) {
          if (handleRemove) {
            buttons.push(
              <Tooltip title={recoveryMode ? 'Recovery' : 'Remove'}>
                <a key="delete" onClick={() => handleRemove(record.id)}>
                  {recoveryMode ? <RollbackOutlined /> : <DeleteOutlined />}
                </a>
                ,
              </Tooltip>,
            );
          }
          if (recoveryMode) {
            if (handleDelete) {
              buttons.push(
                <Tooltip title="Delete">
                  <a key="Delete" onClick={() => handleDelete(record.id)}>
                    <DeleteOutlined />
                  </a>
                </Tooltip>,
              );
            }
          }
        }

        if (viewable) {
          buttons.push(
            <Tooltip title="Detail">
              <Link key="details" target="_blank" to={`/details/${from}/${record.id}`}>
                <ExportOutlined />
              </Link>
            </Tooltip>,
          );
        }
        return <div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{buttons}</div>;
      },
    },
  ];
};
