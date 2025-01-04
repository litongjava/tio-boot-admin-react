import React from 'react';
import {ModalForm} from '@ant-design/pro-components';
import {Form} from 'antd';


type DataFormProps = {
  visible?: boolean;
  title?: string;
  formData?: any;
  onVisibleChange: (visible: boolean) => void;
  onFinish: (value: any) => Promise<boolean>;
  children?: React.ReactNode;
};
const DataForm: React.FC<DataFormProps> = ({
                                             visible,
                                             title,
                                             formData,
                                             onVisibleChange,
                                             onFinish,
                                             children,
                                           }) => {

  const [form] = Form.useForm();
  const onFormVisibleChange = (newVisible: boolean) => {
    onVisibleChange(newVisible);
    if (newVisible) {
      form.setFieldsValue(formData || {});
    } else {
      form.resetFields();
    }
  };

  const onFormFinish = async (formValues: any) => {
    if (await onFinish(formValues)) {
      form.resetFields();
    }
  };

  return (
    <ModalForm  layout={"horizontal"}
      title={title}
      visible={visible}
      onVisibleChange={onFormVisibleChange}
      onFinish={onFormFinish}
      form={form}
      //submitter={submitter}
    >
      {children}

    </ModalForm>


  )
}
export default DataForm;
