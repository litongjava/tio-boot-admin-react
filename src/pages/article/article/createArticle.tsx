import CommonEditor from '@/components/common/CommonEditor';
import { createSystemArticle, getArticleById } from '@/pages/article/article/articleService';
import { Button, Form, Input, message } from 'antd';
import React from 'react';
// @ts-ignore
import { useParams } from 'umi';

const CreateArticle: React.FC = () => {
  // 使用泛型确保类型正确
  const { id } = useParams<{ id: string }>();
  // 编辑器内容
  const [html, setHtml] = React.useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  // 使用 useEffect 来在组件挂载时获取文章内容
  // 组件挂载时根据 id 获取文章内容
  React.useEffect(() => {
    if (id && id !== ':id') {
      getArticleById(id)
        .then((response) => {
          console.log('response:{}', response);
          // 设置表单的初始值
          form.setFieldsValue({
            id: response.data.id,
            title: response.data.title,
          });
          setHtml(response.data.content);
        })
        .catch((err) => message.error('Failed to fetch article: ' + err));
    }
  }, [id]);

  /**
   * 提交操作：提交后清空
   */
  const handleSubmit = async () => {
    try {
      const formValues = await form.validateFields();
      // 将富文本内容添加进 formValues
      formValues.content = html;

      const hide = messageApi.loading('submitting...');
      const response = await createSystemArticle(formValues);

      if (response.ok) {
        // 新增: 如果后端返回了 id，则设置到表单
        if (response.data && response.data.id) {
          form.setFieldsValue({ id: response.data.id });
          messageApi.success('update article successful');
        } else {
          messageApi.success('submit article successful');
        }
        // 提交成功后，清空
        setHtml('');
        form.resetFields();
      } else {
        messageApi.error('failed to create article');
      }
      hide();
    } catch (error) {
      messageApi.error('' + error);
    }
  };

  /**
   * 暂存操作：不清空
   */
  const handleTempSave = async () => {
    try {
      const formValues = await form.validateFields();
      formValues.content = html;

      const hide = messageApi.loading('Saving...');
      const response = await createSystemArticle(formValues);

      if (response.ok) {
        // 新增: 如果后端返回了 id，则设置到表单
        if (response.data && response.data.id) {
          form.setFieldsValue({ id: response.data.id });
          messageApi.success('update article successful');
        } else {
          messageApi.success('save article successful');
        }
      } else {
        messageApi.error('failed to save article');
      }
      hide();
    } catch (error) {
      messageApi.error('' + error);
    }
  };

  /**
   * 重置操作：清空
   */
  const handleReset = () => {
    form.resetFields();
    setHtml('');
  };

  return (
    <>
      {contextHolder}
      <Form
        layout="horizontal"
        form={form}
        // 注意：普通 antd Form 不支持 onFinish 属性直接写 handleSubmit，
        // 而是需要我们手动写 <Button onClick={handleSubmit}>。
      >
        {/* id 隐藏 */}
        <Form.Item name="id" label="id" hidden>
          <Input />
        </Form.Item>

        {/* title 必填 */}
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter title!' }]}
        >
          <Input />
        </Form.Item>

        {/* 编辑器 */}
        <Form.Item label="">
          <CommonEditor value={html} onChange={(editor) => setHtml(editor.getHtml())} />
        </Form.Item>

        <Form.Item>
          {/* 暂存按钮 */}
          <Button type="default" onClick={handleTempSave} style={{ marginRight: 8 }}>
            Save
          </Button>

          {/* 提交按钮 */}
          <Button type="primary" onClick={handleSubmit} style={{ marginRight: 8 }}>
            Sbumit
          </Button>

          {/* 重置按钮 */}
          <Button type="dashed" onClick={handleReset}>
            Resst
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateArticle;
