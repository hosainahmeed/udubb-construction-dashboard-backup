import React, { useState } from 'react';
import { Button, Card, Empty, Input } from 'antd';
import UsernameImage from '../../../../Utils/Sideber/UserImage';
import { useGetAllUserQuery } from '../../../../Redux/services/pagesApisServices/userApis';
import toast from 'react-hot-toast';
import { Link } from 'react-router';
import { FaPlus } from 'react-icons/fa';
import useProjectsCreate from '../../../../contexts/hooks/useProjectsCreate';
const { Search } = Input;

function ProjectsWoners({ setProjectsOwnerModal }) {
  const { projectOwnerAssigned, setProjectOwnerAssigned } = useProjectsCreate();

  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, refetch } = useGetAllUserQuery({
    searchTerm: searchTerm,
    role: 'user',
    limit: 999,
  });

  const onSearch = (value) => {
    setSearchTerm(value);
  };

  if (isLoading) {
    return <span className="loader"></span>;
  }

  const hasManagers = data?.data?.result && data?.data?.result?.length > 0;

  const handleAssign = (user) => {
    // Check if user is already assigned
    if (projectOwnerAssigned.includes(user?._id)) {
      toast.error('This user is already assigned as a project owner!');
      return;
    }

    setProjectOwnerAssigned([...projectOwnerAssigned, user?._id]);
    toast.success('Project owner assigned!');
  };

  // Function to check if a user is already assigned
  const isUserAssigned = (userId) => {
    return projectOwnerAssigned?.includes(userId);
  };

  return (
    <div className="flex flex-col items-start gap-2 !w-full">
      <h1 className="text-2xl font-semibold">Projects Owners</h1>
      <small className="!font-light !text-xs -mt-2 bg-amber-100 !pr-8 py-1 rounded-md pl-2 flex justify-between leading-none items-center w-full ">
        if you dont find any project Owners please search or add
        <Link to="/">
          <Button shape="circle" className="!animate-pulse">
            <FaPlus />
          </Button>
        </Link>
      </small>
      <Search
        placeholder="Search by name or email"
        allowClear
        enterButton={
          <Button type="primary" style={{ backgroundColor: '#213555' }}>
            Search
          </Button>
        }
        size="large"
        onSearch={onSearch}
        className="!w-[400px]"
      />

      {!hasManagers ? (
        <h1 className="text-center w-full my-4">
          <Empty description="No Manager Found" />
        </h1>
      ) : (
        data?.data?.result.map((user) => (
          <Card className="!w-full" key={user?._id}>
            <div className="!flex !items-center !justify-between">
              <UsernameImage
                name={user?.name}
                email={user?.email}
                image={
                  user?.profile_image ||
                  'https://i.ibb.co.com/PsxKbMWH/defult-Image.jpg'
                }
              />

              <Button
                onClick={() => handleAssign(user)}
                className="!bg-[#213555] !text-white !px-6 !py-5"
                disabled={isUserAssigned(user?._id)}
              >
                {isUserAssigned(user?._id) ? 'Assigned' : 'Assign'}
              </Button>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}

export default ProjectsWoners;
