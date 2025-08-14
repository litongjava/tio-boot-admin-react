import { ArrowsAltOutlined, BorderOutlined, VerticalLeftOutlined } from '@ant-design/icons';
import {
  ActionType,
  FooterToolbar,
  ProColumns,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Drawer } from 'antd';
import { SortOrder } from 'antd/lib/table/interface';
import React, { useState } from 'react';
import TooltipButton from '@/components/common/TooltipButton';

type DataTableProp = {
  columns?: ProColumns<any, any>[];
  actionRef: React.MutableRefObject<ActionType | undefined>;
  pageRequest?: (
    params: any & {
      pageSize?: number;
      current?: number;
      keyword?: string;
    },
    sort: Record<string, SortOrder>,
    filter: Record<string, (string | number)[] | null>,
  ) => Promise<Partial<any>>;

  batchRequest?: (params: any) => Promise<boolean>;
  currentRow: any | undefined;
  setCurrentRow: React.Dispatch<any>;
  mode?: boolean;
  showDetail: boolean;
  setShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  toolBarRender?: any;
};

const DataTable: React.FC<DataTableProp> = ({
  columns,
  actionRef,
  pageRequest,
  batchRequest,
  currentRow,
  setCurrentRow,
  mode,
  showDetail,
  setShowDetail,
  toolBarRender,
}) => {
  const [selectedRowsState, setSelectedRows] = useState<any[]>([]);
  const [scrollMode, setScrollMode] = useState<boolean>(false);
  const [showBorder, setShowBorder] = useState<boolean>(false);
  const [showGhost, setShowGhost] = useState<boolean>(false);

  const handleScrollChange = () => {
    setScrollMode(!scrollMode);
  };

  const handleBorderChange = () => {
    setShowBorder(!showBorder);
  };

  const handleGhostChange = () => {
    setShowGhost(!showGhost);
  };

  let showGhostButton = (
    <TooltipButton
      icon={<ArrowsAltOutlined />}
      type="text"
      onClick={handleGhostChange}
      tooltipTitle="Ghost Mode"
    />
  );

  let showScrollButton = (
    <TooltipButton
      icon={<VerticalLeftOutlined />}
      type="text"
      onClick={handleScrollChange}
      tooltipTitle="Toggle Scroll Mode"
    />
  );

  let showBorderButton = (
    <TooltipButton
      icon={<BorderOutlined />}
      type="text"
      onClick={handleBorderChange}
      tooltipTitle="Show Border"
    />
  );

  let onClickBatchRequest = async () => {
    if (batchRequest) {
      batchRequest(selectedRowsState).then((removed) => {
        if (removed) {
          setSelectedRows([]);
        }
      });
    }
  };

  return (
    <>
      <ProTable<any>
        columns={columns}
        actionRef={actionRef}
        request={pageRequest}
        rowKey="id"
        tableLayout="fixed"
        sticky={!scrollMode ? { offsetHeader: 0 } : false}
        scroll={{ x: scrollMode ? true : undefined }}
        ghost={showGhost}
        expandable={{
          expandedRowRender: (record) => <p>{JSON.stringify(record)}</p>,
        }}
        bordered={showBorder}
        options={{
          reload: true,
          density: true,
          fullScreen: true,
          setting: true,
          search: true,
        }}
        search={{
          labelWidth: 'auto',
          defaultCollapsed: true,
        }}
        pagination={{ showSizeChanger: true }}
        toolBarRender={() => [
          ...toolBarRender(),
          showGhostButton,
          showScrollButton,
          showBorderButton,
        ]}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              Selected <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> Items
              &nbsp;&nbsp;
            </div>
          }
        >
          <Button type="primary" onClick={onClickBatchRequest}>
            {mode ? 'Batch recovery' : 'Batch remove'}
          </Button>
        </FooterToolbar>
      )}
      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        destroyOnHide={true}
        title="详情"
      >
        {currentRow?.id && (
          <ProDescriptions<any>
            column={1}
            title={currentRow?.id}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<any>[]}
          />
        )}
      </Drawer>
    </>
  );
};

export default DataTable;
