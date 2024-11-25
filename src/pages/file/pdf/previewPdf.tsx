import React, {useState} from "react";
import jsPreviewPdf from "@js-preview/pdf";
import '@js-preview/docx/lib/index.css';
// @ts-ignore
import {useParams} from 'umi';
import {Button, message, Upload} from "antd";
import {getPdfById} from "@/pages/file/pdf/systemPdfService";

const PreviewDocx: React.FC = () => {
  const {id} = useParams<{ id: string }>();
  // 使用useRef创建一个引用
  const pdfRef = React.useRef(null);

  const [name, setName] = useState("")
  const [urls, setUrls] = useState<any[]>([])
  const [messageApi, contextHolder] = message.useMessage();
  const [pdfViewer, setPdfViewer] = React.useState<any | null>(null);

  function preview(url: string) {
    if (pdfRef.current) {
      // 在组件挂载后初始化预览器，并确保DOM节点已经加载
      let callBack = {
        onRendered: () => {
          messageApi.success('预览完成');
        },
        onError: (e?: any) => {
          messageApi.error('预览失败:' + url);
        },
      };

      // @ts-ignore
      const pdfViewer = jsPreviewPdf.init(pdfRef.current, callBack);
      setPdfViewer(pdfViewer)

      // 传递要预览的文件地址
      pdfViewer.preview(url);
    }
  }

  React.useEffect(() => {
    if (id && id != ':id') {
      getPdfById(id).then(response => {
        if (response.ok) {
          const name = response.data.name;
          setName(name)
          let urls1 = response.data?.urls;
          setUrls(urls1);
          const url = urls1?.[0]?.url
          preview(url);
        } else {
          messageApi.error('Failed to fetch article: ' + id);
        }
      }).catch(err => messageApi.error('Failed to fetch article: ' + err));
    }
  }, [id]);


  const downloadFile = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'true');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleDownload = () => {
    urls.forEach(urlObj => {
      downloadFile(urlObj.url);
    });
  };
  return (
    <>
      {contextHolder}
      <div>
        <div style={{display: "flex", flexDirection: "row"}}>
          <div style={{width:'90%'}}>
            <h1 style={{textAlign: "center"}}>{name}</h1>
          </div>
          <div style={{marginTop:"7px"}}>
            <Button onClick={handleDownload} type="primary">Download</Button>
          </div>
        </div>
        <div ref={pdfRef} id="docx"></div>
      </div>
    </>

  );
}

export default PreviewDocx;
