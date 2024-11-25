import React from "react";
import {getArticleById} from "@/pages/article/article/articleService";
import {message} from "antd";
// @ts-ignore
import {useParams} from 'umi';
import './previewArticel.css'
import '@wangeditor/editor/dist/css/style.css'

const PreviewArticle: React.FC = () => {
  const {id} = useParams<{ id: string }>();
  // 编辑器内容
  const [html, setHtml] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [messageApi, contextHolder] = message.useMessage();
  // 使用 useEffect 来在组件挂载时获取文章内容
  React.useEffect(() => {
    if (id && id !== ':id') {
      getArticleById(id).then(response => {
        if (response.ok) {
          setTitle(response.data.title);
          setHtml(response.data.content);
        } else {
          messageApi.error('Failed to fetch article: ' + id);
        }
      }).catch(err => messageApi.error('Failed to fetch article: ' + err));
    }
  }, [id]);

  return (
    <>
      {contextHolder}
      <h1 style={{textAlign: "center"}}>{title}</h1>
      <div id="editor-content-view" className="editor-content-view" dangerouslySetInnerHTML={{__html: html}}/>
    </>
  );
}

export default PreviewArticle;
