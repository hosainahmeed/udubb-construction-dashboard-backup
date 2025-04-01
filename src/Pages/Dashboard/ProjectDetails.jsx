import React from 'react';
import PageHeading from '../../Components/Shared/PageHeading';
import { Button, Image } from 'antd';
import { Link, useParams } from 'react-router';
import { useGetSingleProjectQuery } from '../../Redux/services/pagesApisServices/projectApis';
import { imageUrl } from '../../Utils/server';
import { MdEdit } from 'react-icons/md';

function ProjectDetails() {
  const params = useParams();
  const { data: project, isLoading: projectsLoading } =
    useGetSingleProjectQuery({ id: params?.id });

  const projectData = project?.data;

  if (projectsLoading) {
    return (
      <div
        style={{
          height: 'calc(100% - 10px)',
        }}
        className="flex justify-center items-center w-full"
      >
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div>
      <PageHeading text={'Project Details'} />
      <div>
        <div className="flex justify-between items-center my-3">
          <h1 className="flex-1">Project Image</h1>
          <Link to="/edit-project" state={params.id}>
            <Button className="flex items-center gap-2">
              <MdEdit /> Edit Project
            </Button>
          </Link>
        </div>
        {/* Display project image if available */}
        <div className="grid grid-cols-1 gap-4">
          {projectData?.projectImage ? (
            <div className="w-[500px] border-dashed border rounded-2xl flex items-center justify-center overflow-hidden h-[250px]">
              <Image
                preview
                className="w-full h-full object-center object-cover"
                src={imageUrl(projectData?.projectImage)}
                alt={projectData?.name}
              />
            </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden bg-gray-200 h-48 flex items-center justify-center">
              <p>No project image available</p>
            </div>
          )}
        </div>
        <div className="my-12 grid grid-cols-2 gap-4">
          <div>
            <h1>Project Owner Email</h1>
            <div className="rounded-lg shadow border border-[#c2c1c1] border-dashed p-3">
              {projectData?.projectOwnerEmail}
            </div>
          </div>
          <div>
            <h1>Project Name</h1>
            <div className="rounded-lg shadow border border-[#c2c1c1] border-dashed p-3">
              {projectData?.name}
            </div>
          </div>
          <div className="col-span-2">
            <h1>Project Title</h1>
            <div className="rounded-lg shadow border border-[#c2c1c1] border-dashed p-3">
              {projectData?.title}
            </div>
          </div>
          <div>
            <h1>Project Start Date</h1>
            <div className="rounded-lg shadow border border-[#c2c1c1] border-dashed p-3">
              {new Date(projectData?.startDate).toLocaleDateString()}
            </div>
          </div>
          <div>
            <h1>Project Stream Link</h1>
            <div className="rounded-lg shadow border border-[#c2c1c1] border-dashed p-3">
              {projectData?.liveLink || 'No link available'}
            </div>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-3 gap-4">
          <div>
            <h1 className="text-lg font-semibold">Project Manager</h1>
            <div className="flex items-center gap-3">
              <div className="w-32 h-24 overflow-hidden rounded-md">
                <Image
                  className="w-full h-full object-cover"
                  src={
                    imageUrl(projectData?.projectManager?.profile_image) ||
                    'https://via.placeholder.com/150'
                  }
                  alt={projectData?.projectManager?.name}
                />
              </div>
              <div className="mt-4">
                <div className="">
                  <p>Name: {projectData?.projectManager?.name}</p>
                  <p>
                    Phone Number: {projectData?.projectManager?.phone || 'N/A'}
                  </p>
                  <p>
                    Email:
                    <a href={`mailto:${projectData?.projectManager?.email}`}>
                      {projectData?.projectManager?.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-lg font-semibold">Finance Manager</h1>
            <div className="flex items-center gap-3">
              <div className="w-32 h-24 overflow-hidden rounded-md">
                <Image
                  className="w-full h-full object-cover"
                  src={
                    imageUrl(projectData?.financeManager?.profile_image) ||
                    'https://i.ibb.co.com/PsxKbMWH/defult-Image.jpg'
                  }
                  alt={projectData?.financeManager?.name}
                />
              </div>
              <div className="mt-4">
                <div className="">
                  <p>Name: {projectData?.financeManager?.name}</p>
                  <p>
                    Phone Number: {projectData?.financeManager?.phone || 'N/A'}
                  </p>
                  <p>
                    Email:
                    <a href={`mailto:${projectData?.financeManager?.email}`}>
                      {projectData?.financeManager?.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-lg font-semibold">Office Manager</h1>
            <div className="flex items-center gap-3">
              <div className="w-32 h-24 overflow-hidden rounded-md">
                <Image
                  className="w-full h-full object-cover"
                  src={
                    imageUrl(projectData?.officeManager?.profile_image) ||
                    'https://via.placeholder.com/150'
                  }
                  alt={projectData?.officeManager?.name}
                />
              </div>
              <div className="mt-4">
                <div className="">
                  <p>Name: {projectData?.officeManager?.name}</p>
                  <p>
                    Phone Number: {projectData?.officeManager?.phone || 'N/A'}
                  </p>
                  <p>
                    Email:
                    <a href={`mailto:${projectData?.officeManager?.email}`}>
                      {projectData?.officeManager?.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
