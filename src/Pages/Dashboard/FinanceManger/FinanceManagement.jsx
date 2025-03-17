import React, { useState } from 'react';
import PageHeading from '../../../Components/Shared/PageHeading.jsx';
import { Button, Form, Input, Modal } from 'antd';
import { FaPlus } from 'react-icons/fa';
import ManagerTable from '../../../Components/Tables/ManagerTable.jsx';

const data = [
  {
    user: {
      name: 'Giring Furqan',
      email: 'giring@gmail.com',
      profile_image: 'https://via.placeholder.com/150',
      phoneNumber: '+99 248 525652321',
      location: 'Indonesia',
    },
  },
  {
    user: {
      name: 'John-W-BOSTON',
      email: 'john@gmail.com',
      profile_image: 'https://via.placeholder.com/150',
      phoneNumber: '+99 458 365652321',
      location: 'United States',
    },
  },
  {
    user: {
      name: 'Yanto Jericho',
      email: 'yanto@gmail.com',
      profile_image: 'https://via.placeholder.com/150',
      phoneNumber: '+92 308 32572113',
      location: 'Pakistan',
    },
  },
  {
    user: {
      name: 'Lukman Farhan',
      email: 'lukman@gmail.com',
      profile_image: 'https://via.placeholder.com/150',
      phoneNumber: '+98 654 89236547',
      location: 'Iran',
    },
  },
  {
    user: {
      name: 'Dimas Kamal',
      email: 'dimas@gmail.com',
      profile_image: 'https://via.placeholder.com/150',
      phoneNumber: '+91 987 6543210',
      location: 'India',
    },
  },
  {
    user: {
      name: 'Hari Danang',
      email: 'hari@gmail.com',
      profile_image: 'https://via.placeholder.com/150',
      phoneNumber: '+90 123 4567890',
      location: 'Turkey',
    },
  },
  {
    user: {
      name: 'Alan Marcus',
      email: 'alan@gmail.com',
      profile_image: 'https://via.placeholder.com/150',
      phoneNumber: '+93 789 6543210',
      location: 'Afghanistan',
    },
  },
  {
    user: {
      name: 'Giring Furqan',
      email: 'giring@gmail.com',
      profile_image: 'https://via.placeholder.com/150',
      phoneNumber: '+99 248 525652321',
      location: 'Indonesia',
    },
  },
  {
    user: {
      name: 'Lukman Farhan',
      email: 'lukman@gmail.com',
      profile_image: 'https://via.placeholder.com/150',
      phoneNumber: '+98 654 89236547',
      location: 'Iran',
    },
  },
  {
    user: {
      name: 'Yanto Jericho',
      email: 'yanto@gmail.com',
      profile_image: 'https://via.placeholder.com/150',
      phoneNumber: '+92 308 32572113',
      location: 'Pakistan',
    },
  },
];
const FinanceManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const handleSubmit = () => {
    form.validateFields().then((values) => {
      console.log(values);
      setShowModal(false);
    });
  };
  return (
    <div className="bg-[var(--black-200)] p-2 rounded mt-4 text-[var(--white-600)]">
      <div className="between-center">
        <PageHeading text={'Finance Management'}></PageHeading>
        <Button
          onClick={() => setShowModal(true)}
          className="!bg-[#213555] !text-white !px-6 !py-5"
        >
          <FaPlus /> Add New Finance Manager
        </Button>
      </div>
      <ManagerTable data={data} pagination={false} />
      <Modal
        centered
        title="Add New Finance Manager"
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FinanceManagement;
