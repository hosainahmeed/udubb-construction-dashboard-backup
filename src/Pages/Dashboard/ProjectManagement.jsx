import React from 'react';
import PageHeading from '../../Components/Shared/PageHeading.jsx';
import { Button } from 'antd';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router';
import ProjectManageTable from '../../Components/Tables/ProjectManageTable.jsx';
const ProjectManagement = () => {

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
      <ProjectManageTable />
    </div>
  );
};

export default ProjectManagement;
