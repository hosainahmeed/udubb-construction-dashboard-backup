import React, { useState } from 'react';
import { Button, Card, Empty, Input } from 'antd';
import UsernameImage from '../../../../Utils/Sideber/UserImage';
import { useGetAllUserQuery } from '../../../../Redux/services/pagesApisServices/userApis';
const { Search } = Input;

function ProjectsWoners({ setProjectOwnerAssigned, setProjectsOwnerModal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading } = useGetAllUserQuery({ searchTerm: searchTerm });

  const onSearch = (value) => {
    setSearchTerm(value);
  };

  if (isLoading) {
    return <div className="">Loading...</div>;
  }
  console.log(data);
  const hasManagers = data?.data?.result && data.data.result.length > 0;
  console.log(data?.data?.result);
  return (
    <div className="flex flex-col items-start gap-2 !w-full">
      <h1 className="text-2xl font-semibold">Projects Woners</h1>
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
          <Empty description=" No Manager Found" />
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
                onClick={() => {
                  setProjectOwnerAssigned(user?._id);
                  setProjectsOwnerModal(false);
                }}
                className="!bg-[#213555] !text-white !px-6 !py-5"
              >
                Assign
              </Button>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}

export default ProjectsWoners;
