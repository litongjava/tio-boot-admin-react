import {Form, Input, message} from 'antd';
import {ModalForm} from '@ant-design/pro-components'
import {changeUserPassword} from "@/services/system/systemService";

type ChangePasswordFormProps = {
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void;
}
const ChangePasswordFormView: React.FC<ChangePasswordFormProps> = ({visible, onVisibleChange}) => {

  const [form] = Form.useForm();
  const [messageApi, messageContextHolder] = message.useMessage()

  const onFinish = async (fromValues: any) => {
    console.log("fromValues:", fromValues)
    try {
      changeUserPassword(fromValues).then(response => {
        if (response.ok) {
          form.resetFields()
          messageApi.success("password changed successful")
          if(onVisibleChange){
            onVisibleChange(false)
          }
        } else {
          messageApi.error("failed to change password:" + response.msg)
        }
      })
    } catch (error) {
      messageApi.error("failed to change password:" + error)
    }


  }
  return (
    <>
      {messageContextHolder}
      <ModalForm title="Change Password" visible={visible} form={form} onVisibleChange={onVisibleChange}
                 onFinish={onFinish}>
        <Form.Item
          name="oldPassword"
          label="Old Password"
          rules={[{required: true, message: 'Please Input Old Password!'}]}
        >
          <Input.Password placeholder="Please Input Old Password"/>
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[{required: true, message: 'Please Input New Password!'}]}
        >
          <Input.Password placeholder="Please Input New Password"/>
        </Form.Item>
        <Form.Item
          name="confirmNewPassword"
          label="Confirm New Password"
          dependencies={['newPassword']}
          hasFeedback
          rules={[
            {required: true, message: 'Please Input Confirm New Password!'},
            ({getFieldValue}) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Enter new password again"/>
        </Form.Item>
      </ModalForm>
    </>
  )
}

export default ChangePasswordFormView
