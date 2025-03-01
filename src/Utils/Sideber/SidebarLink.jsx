import React from 'react';

import { HiOutlineNumberedList } from 'react-icons/hi2';
import { LuCalendarClock } from 'react-icons/lu';
import { MdManageSearch } from 'react-icons/md';
import { RiTeamFill } from 'react-icons/ri';
import { TbCategoryPlus } from 'react-icons/tb';

export const SidebarLink = [
  {
    path: '/',
    label: 'User Manage',
    icon: <LuCalendarClock size={24} />,
  },
  {
    path: '/manager-manage',
    label: 'Manager Manage',
    icon: <MdManageSearch size={24} />,
  },
  {
    path: '/finance-management',
    label: 'Finance Manage',
    icon: <TbCategoryPlus size={24} />,
  },
  {
    path: '/Office-manage',
    label: 'Office Manager',
    icon: <HiOutlineNumberedList size={24} />,
  },
  {
    path: '/project-manage',
    label: 'Project Manage',
    icon: <RiTeamFill size={24} />,
  },
];

export const SettingLinks = [
  {
    path: '/terms-&-condition',
    label: 'Terms & Condition',
  },

  {
    path: '/privacy-policy',
    label: 'Privacy Policy',
  },
  {
    path: '/profile',
    label: 'Profile',
  },
];
