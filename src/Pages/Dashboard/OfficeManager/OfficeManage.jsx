import React, { useState } from 'react';
import PageHeading from '../../../Components/Shared/PageHeading.jsx';
import { Button, Form, Input, Modal, Spin } from 'antd';
import { FaPlus } from 'react-icons/fa';
import OfficeManageTable from '../../../Components/Tables/OfficeManageTable.jsx';
import { useCreateUserMutation } from '../../../Redux/services/pagesApisServices/userApis.js';
import toast from 'react-hot-toast';
const OfficeManage = () => {
  const [showModal, setShowModal] = useState(false);
  const [createManager, { isLoading: isCreating }] = useCreateUserMutation();
  const [form] = Form.useForm();
  const handleSubmit = async () => {
    form.validateFields().then(async (values) => {
      const data = {
        name: values.name,
        email: values.email,
        password: values.password,
        role: 'officeManager',
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
        <PageHeading text={'Office Management'}></PageHeading>
        <Button
          onClick={() => setShowModal(true)}
          className="!bg-[#213555] !text-white !px-6 !py-5"
        >
          <FaPlus />
          Add New Office Manager
        </Button>
      </div>
      <OfficeManageTable />
      <Modal
        centered
        title="Add new Office Manager"
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
              {isCreating ? <span className="loader"></span> : 'Create'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OfficeManage;
