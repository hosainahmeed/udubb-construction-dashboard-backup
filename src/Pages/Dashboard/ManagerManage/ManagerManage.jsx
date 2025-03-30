import React, { useState } from 'react';
import UserManageTable from '../../../Components/Tables/UserManageTable.jsx';
import PageHeading from '../../../Components/Shared/PageHeading.jsx';
import { Button, Form, Input, message, Modal, Spin } from 'antd';
import { FaPlus } from 'react-icons/fa';
import ManagerTable from '../../../Components/Tables/ManagerTable.jsx';
import { useCreateUserMutation } from '../../../Redux/services/pagesApisServices/userApis.js';
import toast from 'react-hot-toast';

const ManagerManage = () => {
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [createManager, { isLoading: isCreating }] = useCreateUserMutation();
  const handleSubmit = async () => {
    form.validateFields().then(async (values) => {
      const data = {
        name: values.name,
        email: values.email,
        password: values.password,
        role: 'manager',
      };
      try {
        const res = await createManager({ data });
        if (res?.data?.success) {
          form.resetFields();
          toast.success(res?.data?.message || 'User created successfully.');
          setShowModal(false);
        } else {
          toast.error(res?.error?.data?.message || 'Failed to create user.');
        }
      } catch (error) {
        toast.error(error?.data?.message || 'Failed to create user.');
      }
    });
  };
  return (
    <div className="bg-[var(--black-200)] p-2 rounded mt-4 text-[var(--white-600)]">
      <div className="between-center">
        <PageHeading text={'Manager Management'}></PageHeading>
        <Button
          onClick={() => setShowModal(true)}
          className="!bg-[#213555] !text-white !px-6 !py-5"
        >
          <FaPlus /> Add New Manager
        </Button>
      </div>
      <ManagerTable />
      <Modal
        title="Add New Manager"
        centered
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <Form
          requiredMark={false}
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item
            rules={[{ required: true, message: 'Name is required' }]}
            label="Name"
            name="name"
          >
            <Input type="name" placeholder="Name" />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'Email is required' }]}
            label="Email"
            name="email"
          >
            <Input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'Password is required' }]}
            label="Password"
            name="password"
          >
            <Input.Password type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              className="!bg-[#213555] !text-white !px-6 !py-5"
            >
              {isCreating ? <span class="loader"></span> : 'Create'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerManage;
