import React, {useState} from "react";
import {
  ActionType,
  FooterToolbar,
  ProColumns,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProTable
} from "@ant-design/pro-components";
import {Button, Drawer} from "antd";
import {SortOrder} from "antd/lib/table/interface";

type DataTableProp = {
  columns?: ProColumns<any, any>[];
  actionRef: React.MutableRefObject<ActionType | undefined>
  pageRequest?: (params: any & {
    pageSize?: number;
    current?: number;
    keyword?: string;
  }, sort: Record<string, SortOrder>, filter: Record<string, (string | number)[] | null>) => Promise<Partial<any>>;

  batchRequest?: (params: any) => Promise<boolean>;
  currentRow: any | undefined
  setCurrentRow: React.Dispatch<any>
  mode?: boolean
  showDetail: boolean
  setShowDetail: React.Dispatch<React.SetStateAction<boolean>>
  toolBarRender?: any
}

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
        search={{
          labelWidth: 'auto',
          defaultCollapsed: true,
        }}
        // form={{initialValues: {pageSize: 10}}}
        pagination={{showSizeChanger: true,}}
        toolBarRender={toolBarRender}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>Selected{' '}
              <a style={{fontWeight: 600,}}>{selectedRowsState.length}</a>{' '}
              Items &nbsp;&nbsp;
            </div>
          }
        >
          <Button type="primary" onClick={onClickBatchRequest}>{mode ? "Batch recovery" : "Batch remove"}</Button>
        </FooterToolbar>
      )}
      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={true}
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
  )
}

export default DataTable;
