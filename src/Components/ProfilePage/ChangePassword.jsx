import React, { useState } from 'react';
import { Button, Form, Input, Spin } from 'antd';
import { usePatchNewPasswordMutation } from '../../Redux/services/authApis';
import toast from 'react-hot-toast';

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [setNewPassword, { isLoading: isNewPassChange }] =
    usePatchNewPasswordMutation({});
  const toggleOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const onFinish = async (values) => {

    const ChangePasswordDatas = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
      confirmNewPassword: values.confirmPassword,
    };
    try {
      const res = await setNewPassword(ChangePasswordDatas).unwrap();
      if (res?.data?.success) {
        toast.success(res?.data?.message || 'Password Changed successfully.');
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      } else {
        toast.error(res?.error?.data?.message || 'Failed to change Password.');
      }
    } catch (error) {
      console.error('Failed to change password:', error);
      toast.error('Failed to change Password.');
    }
  };
  const checkConfirmPassword = (_, value) => {
    const newPassword = form.getFieldValue('newPassword');
    if (value !== newPassword) {
      return Promise.reject(new Error('Passwords do not match!'));
    }
    return Promise.resolve();
  };
  return (
    <Form
      requiredMark={false}
      form={form}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        type={showOldPassword ? 'text' : 'password'}
        name="oldPassword"
        label={<span className="text-black">Old Password</span>}
        rules={[
          {
            required: true,
            message: 'old password is required',
          },
        ]}
      >
        <Input.Password
          style={{
            width: '100%',
            height: 40,
            border: 'none',
            borderRadius: '5px',
            color: '#111',
            backgroundColor: '#fff',
            outline: 'none',
          }}
          className=" p-2 w-full outline-none"
        />
      </Form.Item>

      <Form.Item
        name="newPassword"
        label={<span className="text-black">New Password</span>}
        rules={[
          {
            required: true,
            message: 'new password is required',
          },
        ]}
      >
        <Input.Password
          style={{
            width: '100%',
            height: 40,
            border: 'none',
            borderRadius: '5px',
            color: '#111',
            backgroundColor: '#fff',
            outline: 'none',
          }}
          className=" p-2 w-full outline-none"
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label={<span className="text-black">Confirm Password</span>}
        rules={[
          {
            required: true,
            message: 'confirm password is required',
          },
          {
            validator: checkConfirmPassword,
          },
        ]}
      >
        <Input.Password
          style={{
            width: '100%',
            height: 40,
            border: 'none',
            borderRadius: '5px',
            color: '#111',
            backgroundColor: '#fff',
            outline: 'none',
          }}
          className=" p-2 w-full outline-none"
        />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        // disabled={isNewPassChange}
        className="!bg-[#213555] !hover:bg-[#213555] active:bg-[#213555] w-full"
      >
        {/* {isNewPassChange ? <Spin /> : "Update password"} */}
        update pass
      </Button>
    </Form>
  );
};

export default ChangePassword;
