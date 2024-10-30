import React from 'react';
import {
  batchRemoveSystemImages,
  createSystemImages,
  exportAllSystemImages,
  exportSystemImages,
  pageSystemImages,
  removeSystemImages
} from './systemImagesService';
import ProDataTable from "@/components/common/ProDataTable";
import {customUploadImageToGoogle} from "@/services/system/systemService";
import UploadFileItem from "@/components/common/UploadFileItem";
import {UploadProps} from "antd/lib/upload/interface";
import {useNavigate} from "@@/exports";
import {systemImagesColumns} from "@/pages/system/images/systemImagesColumn";


const SystemImagesManagement: React.FC = () => {
  let navigate = useNavigate();
  const [fileList, setFileList] = React.useState<any[]>([]);

  const handleChange: UploadProps['onChange'] = ({fileList: newFileList}) => {
    setFileList(newFileList);
  }


  const onFormVisibleChange = (visible: boolean, currentRow: any) => {
    if (visible) {
      if (currentRow && currentRow.urls) {
        setFileList(currentRow.urls);
      } else {
        setFileList([]);
      }
    }
  }

  const beforeCreateRequest = (params: any) => {
    params.urls = fileList.map((file: any) => {
      console.log("file:", file);
      return {
        uid: file.uid,
        name: file.name,
        status: file.status,
        size: file.size,
        type: file.type,
        id: file.id || file.response?.data.id,
        url: file.url || file.response?.data.url
      }
    });

    params.id_type = "long";
    params.json_fields_type = 'string[]';
    params.json_fields = ["urls"];
    return params;
  }


  const beforePageRequest = (params: any) => {
    params.idType = 'long';
    params.deleted = 0
    params.json_fields_type = 'string[]';
    params.json_fields = ["urls"];
    params.orderBy = 'name';
    params.isAsc = 'false';
    return params;
  }

  const columns = systemImagesColumns();

  return (
    <ProDataTable columns={columns} createRequest={createSystemImages} deleteRequest={removeSystemImages}
                  batchRemoveRequest={batchRemoveSystemImages}
                  pageRequest={pageSystemImages}
                  exportRequest={exportSystemImages}
                  exportAllRequest={exportAllSystemImages}
                  beforePageRequest={beforePageRequest}
                  beforeCreateRequest={beforeCreateRequest}
                  onFormVisibleChange={onFormVisibleChange}>

      <UploadFileItem label="Files" max={1} name="urls" fileList={fileList} onChange={handleChange}
                      customRequest={customUploadImageToGoogle}/>

      <div>
        {fileList.map((file) => {
          return <div key={file.id || file.response?.data.id}>{file.url || file.response?.data.url}</div>
        })}
      </div>
    </ProDataTable>

  );
};

export default SystemImagesManagement;
