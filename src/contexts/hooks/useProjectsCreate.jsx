import { useContext } from 'react';
import { ProjectsCreateContext } from '../ProjectsCreateContext';


const useProjectsCreate = () => {
  const context = useContext(ProjectsCreateContext);
  if (!context) {
    throw new Error(
      'useProjectsCreate must be used within a ProjectsCreateProvider'
    );
  }
  return context;
};

export default useProjectsCreate;
