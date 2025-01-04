import React from "react";
import CommonEditor from "@/components/common/CommonEditor";
import {ProForm, ProFormText} from "@ant-design/pro-components";
import {createSystemArticle, getArticleById} from "@/pages/article/article/articleService";
import {Form, message} from "antd";
// @ts-ignore
import {useParams} from 'umi';

const CreateArticle: React.FC = () => {
  // 使用泛型确保类型正确
  const {id} = useParams<{ id: string }>();
  // 编辑器内容
  const [html, setHtml] = React.useState('')
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  // 使用 useEffect 来在组件挂载时获取文章内容
  React.useEffect(() => {
    if (id && id !== ':id') {
      getArticleById(id).then(response => {
        console.log("response:{}", response)
        form.setFieldsValue({id: response.data.id, title: response.data.title});
        setHtml(response.data.content);
      }).catch(err => message.error('Failed to fetch article: ' + err));
    }
  }, [id]);

  const handleSubmit = async () => {
    const formValues = await form.validateFields();
    formValues.content = html;
    const hide = messageApi.loading("submitting...")
    try {
      const response = await createSystemArticle(formValues);
      if (response.ok) {
        messageApi.success("create article successful")
        setHtml("")
        form.resetFields();
      } else {
        messageApi.error("failed to crate article")
      }
      hide()
    } catch (error) {
      messageApi.error("" + error)
      hide()
    }
  }
  return (
    <>
      {contextHolder}
      <ProForm layout="horizontal" onFinish={handleSubmit} form={form}>
        <ProFormText name="id" label="id" hidden/>
        <ProFormText name="title" label="Title"
                     rules={[{required: true}]}/>
        <CommonEditor value={html} onChange={editor => setHtml(editor.getHtml())}/>
      </ProForm>
    </>
  )
}

export default CreateArticle;
