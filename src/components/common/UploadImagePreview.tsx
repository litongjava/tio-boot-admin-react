import React, {useState} from "react";
import {Image, Upload} from "antd";
import {UploadFile} from "antd/lib/upload/interface";
import {UploadListType} from "antd/es/upload/interface";

type UploadImagePreviewProps = {
  fileList: UploadFile[],
  listType?: UploadListType,
}
const UploadImagePreview: React.FC<UploadImagePreviewProps> = ({fileList, listType}) => {

  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  const getBase64 = (file: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as Blob);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  return (
    <>
      <Upload
        listType={listType}
        fileList={fileList}
        onPreview={handlePreview}
        showUploadList={{
          showRemoveIcon: false,
          showPreviewIcon: true
        }}
      >
      </Upload>
      {
        previewImage && (
          <Image
            wrapperStyle={{display: 'none'}}
            preview={{
              visible: previewOpen,
              onVisibleChange: setPreviewOpen,
              afterOpenChange: (visible) => !visible && setPreviewOpen(false),
            }}
            src={previewImage}
          />
        )
      }
    </>
  )
}


export default UploadImagePreview;
