import React from 'react';
import { createContext, useState } from 'react';

export const ProjectsCreateContext = createContext();

export const ProjectsCreateProvider = ({ children }) => {
  const [projectOwnerAssigned, setProjectOwnerAssigned] = useState([]);
  const [projectManagerAssigned, setProjectManagerAssigned] = useState([]);
  const [officeManagerAssigned, setOfficeManagerAssigned] = useState([]);
  const [financeManagerAssigned, setFinanceManagerAssigned] = useState([]);

  return (
    <ProjectsCreateContext.Provider
      value={{
        projectOwnerAssigned,
        setProjectOwnerAssigned,
        projectManagerAssigned,
        setProjectManagerAssigned,
        officeManagerAssigned,
        setOfficeManagerAssigned,
        financeManagerAssigned,
        setFinanceManagerAssigned,
      }}
    >
      {children}
    </ProjectsCreateContext.Provider>
  );
};
