import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { EyeTwoTone } from "@ant-design/icons";
import "antd/dist/reset.css";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useLoginPostMutation } from "../../Redux/services/authApis";
import toast from "react-hot-toast";

const { Title, Text } = Typography;
const Login = () => {
  const route = useNavigate();
  const [handleLogin, { isLoading }] = useLoginPostMutation();
  const onFinish = async (values) => {
    try {
      const data = {
        email: values.email,
        password: values.password,
      };
      const res = await handleLogin({ data });

      if (res?.data?.success) {
        localStorage.removeItem("accessToken");
        localStorage.setItem("accessToken", res?.data?.data?.accessToken);
        toast.success(res?.data?.message);
        route("/");
      }
    } catch (error) {
      console.error(error?.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#213555] p-4">
      <div className="bg-white shadow-lg relative rounded-2xl p-6 w-full max-w-lg text-center">
        <Title level={3} className="text-blue-500"></Title>
        <div className="flex mb-6 flex-col items-start">
          <Title level={3} className="mb-1">
            Welcome back
          </Title>
        </div>

        <Form requiredMark={false} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email address"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Enter a valid email address!" },
            ]}
            style={{
              marginTop: 10,
              marginBottom: 10,
              textAlign: "start",
            }}
          >
            <Input
              placeholder="MichealScott@gmail.com"
              type="email"
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
            style={{
              marginTop: 10,
              marginBottom: 10,
              textAlign: "start",
            }}
          >
            <Input.Password
              iconRender={(visible) => (
                <EyeTwoTone twoToneColor={visible ? "#213555" : "#213555"} />
              )}
              placeholder="Password"
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <div className="flex items-center justify-end">
            <Link
              to="/forgot-password"
              className="!text-[#213555] hover:!underline"
            >
              Forgot password?
            </Link>
          </div>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full !bg-[#213555]"
            style={{ marginTop: 10 }}
          >
            {isLoading ? <span class="loader"></span> : "Continue with Email"}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
