import { DeleteOutlined, EditOutlined, ExportOutlined, RollbackOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
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
  const indexColumn: ProColumns<any> = {
    title: 'Num',
    dataIndex: 'rowNumber',
    width: 60,
    align: 'center',
    hideInForm: true,
    hideInSearch: true,
    render: (text, entity, index, action?: ActionType) => {
      // Table 场景：有 pageInfo + index，计算跨页连续序号
      if (action?.pageInfo && typeof index === 'number') {
        const { current = 1, pageSize = 15 } = action.pageInfo;
        const num = (current - 1) * pageSize + index + 1;

        // 把 num 写回去，供 Drawer/Descriptions 复用同一 columns 时直接读
        const withNum = { ...entity, rowNumber: num };

        return <a onClick={() => handleShowDetailDraw?.(withNum)}>{num}</a>;
      }

      // Descriptions 场景：没有 action/index，直接用记录里的 rowNumber（由上面写入）
      return text ?? entity?.rowNumber ?? '-';
    },
  };

  const idColumn: ProColumns<any> = {
    title: 'Id',
    dataIndex: 'id',
    copyable: true,
    ellipsis: true,
    width: 80,
    align: 'center',
    render: (dom, entity, index, action?: ActionType) => {
      let num = entity?.rowNumber;
      if (action?.pageInfo && typeof index === 'number') {
        const { current = 1, pageSize = 15 } = action.pageInfo;
        num = (current - 1) * pageSize + index + 1;
      }
      const withNum = num ? { ...entity, rowNumber: num } : entity;
      return <a onClick={() => handleShowDetailDraw?.(withNum)}>{dom}</a>;
    },
  };

  return [
    indexColumn,
    idColumn,
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
        return (
          <div
            style={{
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
            }}
          >
            {buttons}
          </div>
        );
      },
    },
  ];
};
