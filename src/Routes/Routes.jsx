import React from 'react';
import Dashboard from '../Layout/Dashboard';
import Login from '../Pages/Auth/Login';
import ForgetPassword from '../Pages/Auth/ForgetPassword';
import Otp from '../Pages/Auth/Otp';
import ResetPassword from '../Pages/Auth/ResetPassword';
import { createBrowserRouter } from 'react-router';
import UserManage from '../Pages/Dashboard/UserManage';
import TermsCondition from '../Pages/Dashboard/TermsCondition';
import PrivacyPolicy from '../Pages/Dashboard/PrivacyPolicy';
import Profile from '../Pages/Dashboard/Profile.jsx';
import ManagerManage from '../Pages/Dashboard/ManagerManage.jsx';
import FinanceManagement from '../Pages/Dashboard/FinanceManagement.jsx';
import OfficeManage from '../Pages/Dashboard/OfficeManage.jsx';
import ProjectManagement from '../Pages/Dashboard/ProjectManagement.jsx';
import ProjectForm from '../Pages/Dashboard/ProjectForm.jsx';
export const Routes = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
    children: [
      {
        path: '/',
        element: <UserManage />,
      },
      {
        path: '/manager-manage',
        element: <ManagerManage />,
      },

      {
        path: '/finance-management',
        element: <FinanceManagement />,
      },
      {
        path: '/Office-manage',
        element: <OfficeManage />,
      },
      {
        path: '/project-manage',
        element: <ProjectManagement />,
      },
      {
        path: '/add-new-project',
        element: <ProjectForm />,
      },
      {
        path: '/terms-&-condition',
        element: <TermsCondition />,
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicy />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forgot-password',
    element: <ForgetPassword />,
  },
  {
    path: '/otp',
    element: <Otp />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
]);
