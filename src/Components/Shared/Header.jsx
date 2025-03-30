import React from 'react';
import { Avatar, Dropdown, Menu, Skeleton } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router';
import logo from '../../assets/logo.svg';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useGetProfileDataQuery } from '../../Redux/services/profileApis';
function Header() {
  const { data, isLoading } = useGetProfileDataQuery();
  const user = {
    photoURL: data?.data?.profile_image,
    displayName: data?.data?.name,
    email: data?.data?.email,
  };
  const route = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    toast.success('Sign out successfully!');
    route('/login');
  };

  const menu = (
    <Menu className="w-fit rounded-xl shadow-lg">
      <div className="p-4 flex items-center gap-3">
        <Avatar size={48} src={user?.photoURL} />
        <div>
          <h1 className="font-semibold text-base">{user?.displayName}</h1>
          <h1 className="font-normal opacity-75 text-sm">{user?.email}</h1>
        </div>
      </div>
      <Menu.Divider />
      <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="4" icon={<LogoutOutlined />} onClick={handleSignOut}>
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="px-10 h-16 flex justify-between items-center">
      <img className="h-12" src={logo} alt="DealScout" />
      <div className="flex items-center  gap-4 text-2xl">
        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
          {isLoading ? (
            <Skeleton size="large" loading={isLoading} active avatar></Skeleton>
          ) : (
            <Avatar size={40} src={user?.photoURL} className="cursor-pointer" />
          )}
        </Dropdown>
      </div>
    </div>
  );
}

export default Header;
