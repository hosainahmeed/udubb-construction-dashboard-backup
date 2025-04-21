import React, { useState } from 'react';
import { Table, Modal } from 'antd';
import { Space, Button } from 'antd';
import { IoEyeSharp } from 'react-icons/io5';
import { MdEdit, MdOutlineArrowOutward } from 'react-icons/md';
import { Link } from 'react-router';
import { useGetAllProjectsQuery } from '../../Redux/services/pagesApisServices/projectApis';
import UsernameImage from '../../Utils/Sideber/UserImage';

const ProjectManageTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetAllProjectsQuery({
    page: currentPage,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const projectDataInformation =
    data?.data?.result?.map((project, index) => ({
      key: project._id,
      sl_No: index + 1,
      project: {
        name: project?.name || 'N/A',
        projectImage: project?.projectImage || '',
        title: project?.title || 'N/A',
        projectOwnerEmail: Array.isArray(project?.projectOwner)
          ? project.projectOwner
              ?.slice(0, 1)
              ?.map((pm) => pm?.email)
              .join(', ')
          : 'N/A',
        liveLink: project?.liveLink || 'N/A',
        startDate: project?.startDate || 'N/A',
      },
    })) || [];
  const showProjectModal = (record) => {
    setSelectedProject(record?.project);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Sl no.',
      dataIndex: 'sl_No',
      key: 'sl_No',
      render: (sl_No) => <p>#{sl_No}</p>,
    },
    {
      title: 'Project Info',
      dataIndex: 'project',
      key: 'project',
      render: (project) => (
        <UsernameImage
          image={
            project?.projectImage ||
            'https://i.ibb.co.com/PsxKbMWH/defult-Image.jpg'
          }
          name={project?.name}
          email={project?.projectOwnerEmail}
        />
      ),
    },
    {
      title: 'Live Link',
      dataIndex: ['project', 'liveLink'],
      key: 'liveLink',
      render: (liveLink) => (
        <Link to={liveLink} target="_blank" rel="noopener noreferrer">
          {liveLink}
        </Link>
      ),
    },
    {
      title: 'Start Date',
      dataIndex: ['project', 'startDate'],
      key: 'startDate',
      render: (startDate) => new Date(startDate).toLocaleDateString(),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/edit-project`} state={record.key}>
            <Button type="default" shape="circle">
              <MdEdit />
            </Button>
          </Link>
          <Button
            onClick={() => showProjectModal(record)}
            type="default"
            shape="circle"
          >
            <IoEyeSharp />
          </Button>
          <Link to={`/project-manage/${record?.key}`}>
            <Button type="default" shape="circle">
              <MdOutlineArrowOutward />
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        rowClassName={() => 'table-row'}
        className="mt-2"
        dataSource={projectDataInformation}
        columns={columns}
        onChange={(page) => setCurrentPage(page?.current)}
        pagination={{
          pageSize: data?.data?.meta?.limit,
          total: data?.data?.meta?.total,
          current: data?.data?.meta?.page,
        }}
        loading={isLoading}
      />
      <Modal
        title="Project Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button
            className="!text-white !bg-[#08765F]"
            key="back"
            onClick={handleCancel}
          >
            Close
          </Button>,
        ]}
      >
        {selectedProject && (
          <div>
            <p>
              <strong>Project Name:</strong> {selectedProject?.name}
            </p>
            <p>
              <strong>Title:</strong> {selectedProject?.title}
            </p>
            <p>
              <strong>Project Owner Email:</strong>{' '}
              {selectedProject?.projectOwnerEmail}
            </p>
            <p>
              <strong>Live Link:</strong>{' '}
              <a href={selectedProject?.liveLink}>
                {selectedProject?.liveLink}
              </a>
            </p>
            <p>
              <strong>Start Date:</strong>{' '}
              {new Date(selectedProject?.startDate).toLocaleDateString()}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ProjectManageTable;
