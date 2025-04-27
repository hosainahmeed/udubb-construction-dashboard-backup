import React from 'react';
import { Typography, Button, Form, Input, Space } from 'antd';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from '../../Redux/services/authApis';
const { Title, Text } = Typography;

const Otp = () => {
  const navigate = useNavigate();
  const [verifyOtp] = useVerifyOtpMutation();
  const [resendOtp] = useResendOtpMutation();
  const [form] = Form.useForm();
  const email = localStorage.getItem('forgetEmail');

  const handleContinue = async (values) => {
    const otp = Number(values.otp);
    if (values.otp.length !== 6) {
      return toast.error('Please enter a valid OTP.');
    }
    try {
      const data = {
        email: email,
        resetCode: otp,
      };
      const res = await verifyOtp({ data });
      if (res?.data?.success) {
        toast.success(res?.data?.message || 'OTP verified successfully.');
        navigate('/reset-password');
      } else {
        toast.error(res?.error?.data?.message || 'Failed to verify OTP.');
      }
    } catch (error) {
      console.error('Failed to verify OTP:', error);
    }
  };


  const handleResend = async () => {
    form.resetFields();

    const email = localStorage.getItem('forgetEmail');
    try {
      if (!email) {
        toast.error('Email not found.');
        navigate('/forgot-password');
        return;
      }
      const data = {
        email: email,
      };
      const res = await resendOtp({ data }).unwrap();
    } catch (error) {}
    navigate('/otp');
  };
// TODO : add resend otp
  return (
    <div
      style={{
        background: '#213555',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '24px',
          width: '100%',
          maxWidth: '480px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}
      >
        <Space
          direction="vertical"
          size="small"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            marginBottom: '24px',
          }}
        >
          <Title level={3} style={{ margin: 0 }}>
            Reset Password
          </Title>
          <Text type="secondary">
            We sent a 6-digit OTP to <Text strong>{email}</Text>.
            Please input it below.
          </Text>
        </Space>

        <Form form={form} layout="vertical" onFinish={handleContinue}>
          <Form.Item
            name="otp"
            style={{ marginBottom: '24px', textAlign: 'center' }}
            rules={[{ required: true, message: 'Please input your OTP!' }]}
          >
            <Input.OTP
              length={6}
              inputType="numeric"
              inputStyle={{
                width: '48px',
                height: '48px',
                fontSize: '18px',
                textAlign: 'center',
              }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: '16px' }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              style={{ background: '#213555', borderColor: '#213555' }}
            >
              Continue
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center' }}>
          <Button
            type="link"
            onClick={handleResend}
            style={{ color: '#213555', padding: 0 }}
            className="hover:underline"
          >
            Resend OTP
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Otp;
