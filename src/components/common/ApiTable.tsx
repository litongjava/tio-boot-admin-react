import ProDataTable from '@/components/common/ProDataTable';
import UploadFileItem from '@/components/common/UploadFileItem';
import { customUpload } from '@/services/system/systemService';
import {
  createRequest,
  deleteRequestOfLong,
  exportAllRequest,
  exportRequest,
  pageRequest,
  softBatchRecoveryRequestOfLong,
  softBatchRemoveRequestOfLong,
  softRecoveryRequestOfLong,
  softRemoveRequestOfLong,
} from '@/utils/apiTable';
import { UploadFile, UploadProps } from 'antd/lib/upload/interface';
import React, { useState } from 'react';

interface JtsDataTableLongProps {
  from: string;
  params?: any;
  columns: any;
  beforeCreateRequest?: (params: any, containsUpload?: boolean) => any;
  beforePageRequest: (params: any, isRecoveryMode?: boolean, containsUpload?: boolean) => any;
  containsUpload?: boolean;
  maxFiles?: number;
  uploadCategory?: string;
  editable?: boolean;
  removable?: boolean;
  viewable?: boolean;
}

const ApiTable: React.FC<JtsDataTableLongProps> = ({
  from,
  params,
  columns,
  beforeCreateRequest,
  beforePageRequest,
  containsUpload,
  maxFiles,
  uploadCategory,
                                                     editable,
                                                     removable,
                                                     viewable,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const dataTableBeforeCreateRequest = (params: any) => {
    if (containsUpload) {
      params.files = fileList.map((file: any) => {
        return {
          uid: file.uid,
          name: file.name,
          status: file.status,
          size: file.size,
          type: file.type,
          id: file.id || file.response?.data.id,
          url: file.url || file.response?.data.url,
        };
      });
    }
    if (beforeCreateRequest) {
      return beforeCreateRequest(params, containsUpload);
    } else {
      return params;
    }
  };

  const afterCreateRequest = () => {
    setFileList([]);
  };

  const onFormVisibleChange = (visible: boolean, currentRow: any) => {
    if (visible) {
      if (currentRow && currentRow.files) {
        setFileList(currentRow.files);
      } else {
        setFileList([]);
      }
    }
  };

  const customUploadRequest = (options: any) => {
    if (uploadCategory) {
      return customUpload(uploadCategory, options);
    } else {
      return customUpload('default', options);
    }
  };

  const dataTableBeforePageRequest = (params: any, recoveryMode?: boolean) => {
    return beforePageRequest(params, recoveryMode, containsUpload);
  };
  return (
    <ProDataTable
      from={from}
      params={params}
      columns={columns}
      createRequest={createRequest}
      pageRequest={pageRequest}
      exportRequest={exportRequest}
      exportAllRequest={exportAllRequest}
      removeRequest={softRemoveRequestOfLong}
      deleteRequest={deleteRequestOfLong}
      recoveryRequest={softRecoveryRequestOfLong}
      batchRemoveRequest={softBatchRemoveRequestOfLong}
      batchRecoveryRequest={softBatchRecoveryRequestOfLong}
      beforePageRequest={dataTableBeforePageRequest}
      beforeCreateRequest={dataTableBeforeCreateRequest}
      afterCreateRequest={afterCreateRequest}
      onFormVisibleChange={onFormVisibleChange}
      editable={editable}
      removable={removable}
      viewable={viewable}
    >
      {containsUpload && (
        <UploadFileItem
          label="Files"
          max={maxFiles}
          name="urls"
          fileList={fileList}
          onChange={handleChange}
          customRequest={customUploadRequest}
        />
      )}

      {containsUpload && (
        <div>
          <div>Urls:</div>
          {fileList &&
            fileList
              .map((file) => file.url || file.response?.data.url)
              .filter((url) => url !== undefined)
              .map((url, index) => (
                <div key={index}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {url}
                  </a>
                </div>
              ))}
        </div>
      )}
    </ProDataTable>
  );
};

export default ApiTable;
