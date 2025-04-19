import React, { useState } from 'react';
import { useGetAllUserQuery } from '../../../../Redux/services/pagesApisServices/userApis';
import { Button, Card, Empty, Input } from 'antd';
import UsernameImage from '../../../../Utils/Sideber/UserImage';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router';
import toast from 'react-hot-toast';
import useProjectsCreate from '../../../../contexts/hooks/useProjectsCreate';
const { Search } = Input;

function OfficeManager({
  // setOfficeManagerAssigned,
  setOfficeManagerModal,
  // officeManagerAssigned,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, refetch } = useGetAllUserQuery({
    role: 'officeManager',
    searchTerm: searchTerm,
    limit: 999,
  });
  const { officeManagerAssigned, setOfficeManagerAssigned } =
    useProjectsCreate();
  const onSearch = (value) => {
    setSearchTerm(value);
  };

  if (isLoading) {
    return <span class="loader"></span>;
  }

  const hasManagers = data?.data?.result && data.data.result.length > 0;

  // const handleAssign = (user) => {
  //   setOfficeManagerAssigned(user?._id);
  //   localStorage.setItem('officeManager', user?._id);
  //   refetch();
  //   toast.success('Office manager assigned.');
  //   setOfficeManagerModal(false);
  // };
  const handleAssign = (user) => {
    setOfficeManagerAssigned([...officeManagerAssigned, user?._id]);
    // const prevProjectOwner = localStorage.getItem('projectOwner');
    // const newProjectOwner = JSON.parse(prevProjectOwner) || [];
    // localStorage.setItem(
    //   'projectOwner',
    //   JSON.stringify([...newProjectOwner, user?._id])
    // );
    // refetch();
    toast.success('Project owner assigned!');
  };
  return (
    <div className="flex flex-col items-start gap-2 !w-full">
      <div className="w-full flex flex-col items-start">
        <h1 className="text-2xl font-semibold leading-none">Office Managers</h1>
        <small className="!font-light !text-xs -mt-2 bg-amber-100 !pr-8 py-1 rounded-md pl-2 flex justify-between leading-none items-center w-full ">
          if you dont find any office manager please search or add
          <Link to="/Office-manage">
            <Button shape="circle" className="!animate-pulse">
              <FaPlus />
            </Button>
          </Link>
        </small>
      </div>
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

export default OfficeManager;
