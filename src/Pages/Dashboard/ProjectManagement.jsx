import React, { useState } from 'react';
import PageHeading from '../../Components/Shared/PageHeading.jsx';
import { Button, Form, Input, Modal } from 'antd';
import { FaPlus } from 'react-icons/fa';
import OfficeManageTable from '../../Components/Tables/OfficeManageTable.jsx';
import { Link } from 'react-router';
import ProjectManageTable from './ProjectManageTable.jsx';
const data = [
  {
    user: {
      _id: 'asdkjalksdj234234324m23432423423',
      name: 'Giring Furqan',
      email: 'giring@gmail.com',
      profile_image: 'https://via.placeholder.com/150',
      phoneNumber: '+99 248 525652321',
      location: 'Indonesia',
    },
  },
  {
    user: {
      _id: 'asdkjalksdj234234324m234324 ',
      name: 'John-W-BOSTON',
      email: 'john@gmail.com',
      profile_image: 'https://via.placeholder.com/150',
      phoneNumber: '+99 458 365652321',
      location: 'United States',
    },
  },
  {
    user: {
      _id: 'asdkjalksdj2342323432423423',
      name: 'Yanto Jericho',
      email: 'yanto@gmail.com',
      profile_image: 'https://via.placeholder.com/150',
      phoneNumber: '+92 308 32572113',
      location: 'Pakistan',
    },
  },
  {
    user: {
      _id: 'asdkjalksdj234234324m23423',
      name: 'Lukman Farhan',
      email: 'lukman@gmail.com',
      profile_image: 'https://via.placeholder.com/150',
      phoneNumber: '+98 654 89236547',
      location: 'Iran',
    },
  },
  {
    user: {
      _id: 'asdkjalksdj234234324m23432423423',
      name: 'Dimas Kamal',
      email: 'dimas@gmail.com',
      profile_image: 'https://via.placeholder.com/150',
      phoneNumber: '+91 987 6543210',
      location: 'India',
    },
  },
  {
    user: {
      _id: 'asdkjalk234234324m23432423423',
      name: 'Hari Danang',
      email: 'hari@gmail.com',
      profile_image: 'https://via.placeholder.com/150',
      phoneNumber: '+90 123 4567890',
      location: 'Turkey',
    },
  },
  {
    user: {
      _id: 'asdkjalksdj23423324m22423423',
      name: 'Alan Marcus',
      email: 'alan@gmail.com',
      profile_image: 'https://via.placeholder.com/150',
      phoneNumber: '+93 789 6543210',
      location: 'Afghanistan',
    },
  },
  {
    user: {
      _id: 'asdkjalksdj234234324m23432423',
      name: 'Giring Furqan',
      email: 'giring@gmail.com',
      profile_image: 'https://via.placeholder.com/150',
      phoneNumber: '+99 248 525652321',
      location: 'Indonesia',
    },
  },
  {
    user: {
      _id: 'ajalksdj23424324m2343243423',
      name: 'Lukman Farhan',
      email: 'lukman@gmail.com',
      profile_image: 'https://via.placeholder.com/150',
      phoneNumber: '+98 654 89236547',
      location: 'Iran',
    },
  },
  {
    user: {
      _id: 'asdkjalksd3423434m43242323',
      name: 'Yanto Jericho',
      email: 'yanto@gmail.com',
      profile_image: 'https://via.placeholder.com/150',
      phoneNumber: '+92 308 32572113',
      location: 'Pakistan',
    },
  },
];
const ProjectManagement = () => {
  const [form] = Form.useForm();
  return (
    <div className="bg-[var(--black-200)] p-2 rounded mt-4 text-[var(--white-600)]">
      <div className="between-center">
        <PageHeading text={'Project Management'}></PageHeading>
        <Link to={`/add-new-project`}>
          <Button className="!bg-[#213555] !text-white !px-6 !py-5">
            <FaPlus /> Add New Project
          </Button>
        </Link>
      </div>
      <ProjectManageTable data={data} pagination={false} />
    </div>
  );
};

export default ProjectManagement;
