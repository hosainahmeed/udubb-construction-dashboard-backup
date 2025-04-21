import React, { useState } from 'react';
import PageHeading from '../../Components/Shared/PageHeading';
import { Button, Card, Image, Spin, Empty, Divider } from 'antd';
import { Link, useParams, useNavigate } from 'react-router';
import { useGetSingleProjectQuery } from '../../Redux/services/pagesApisServices/projectApis';
import { imageUrl } from '../../Utils/server';
import {
  MdEdit,
  MdOutlineDocumentScanner,
  MdDateRange,
  MdLink,
  MdEmail,
  MdPerson,
} from 'react-icons/md';
import { FaUserTie } from 'react-icons/fa';
import { useProjectsDocumentQuery } from '../../Redux/services/pagesApisServices/doucmentApis';
import pdf from '../../assets/pdf.png';

function ProjectDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [limit, setLimit] = useState(3);

  const { data: project, isLoading: projectsLoading } =
    useGetSingleProjectQuery({ id: params?.id });
  const projectData = project?.data;

  const { data: documentData, isLoading: documentDataLoading } =
    useProjectsDocumentQuery({ id: projectData?._id, limit: limit });

  const handleViewAllDocuments = () => {
    navigate('/all-document', { state: projectData?._id });
  };

  if (projectsLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Spin size="large" tip="Loading project details..." />
      </div>
    );
  }

  // Helper function to render manager card with consistent styling
  const renderManagerCard = (managerType, manager, borderColor, iconColor) => {
    // Check if manager exists and has data
    const hasManager =
      manager && (manager.name || manager.email || manager.phone);

    return (
      <Card className="hover:shadow-lg transition-all duration-300">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            {managerType}
          </h3>
          <div
            className={`mx-auto !w-24 !h-24 rounded-full overflow-hidden border-4 border-${borderColor}-100 mb-4`}
          >
            <Image
              className="!w-full !h-full !object-cover"
              src={
                hasManager && manager.profile_image
                  ? imageUrl(manager.profile_image)
                  : 'https://via.placeholder.com/150'
              }
              alt={hasManager ? manager.name : `${managerType} Placeholder`}
            />
          </div>
          <h4 className="font-medium text-lg">
            {hasManager && manager.name ? manager.name : 'Not assigned'}
          </h4>
          <Divider className="my-3" />
          <p className="flex items-center justify-center gap-2 text-gray-600">
            <MdEmail className={`text-${iconColor}-500`} />
            {hasManager && manager.email ? (
              <a
                href={`mailto:${manager.email}`}
                className={`hover:text-${iconColor}-600`}
              >
                {manager.email}
              </a>
            ) : (
              <span>N/A</span>
            )}
          </p>
          <p className="flex items-center justify-center gap-2 text-gray-600 mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 text-${iconColor}-500`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            {hasManager && manager.phone ? manager.phone : 'N/A'}
          </p>
        </div>
      </Card>
    );
  };

  return (
    <div className=" px-4 py-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <PageHeading text={'Project Details'} />
        <Link to="/edit-project" state={params.id}>
          <Button
            type="primary"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-all"
          >
            <MdEdit /> Edit Project
          </Button>
        </Link>
      </div>

      {/* Project Header Section */}
      <div className="mb-10 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {projectData?.name}
        </h1>
        <p className="text-lg text-gray-600 mb-2">{projectData?.title}</p>
        <div className="flex items-center text-gray-500">
          <MdDateRange className="mr-2" />
          <span>
            Started on{' '}
            {new Date(projectData?.startDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>

      {/* Project Image Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
          <MdOutlineDocumentScanner className="inline-block mr-2" />
          Project Image
        </h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          {projectData?.projectImage ? (
            <div>
              <Image
                preview
                className="w-full !max-w-48 object-center object-cover transition-all hover:scale-105 duration-300"
                src={imageUrl(projectData?.projectImage)}
                alt={projectData?.name}
              />
            </div>
          ) : (
            <Empty description="No project image available" />
          )}
        </div>
      </div>

      {/* Project Documents Section */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
            <MdOutlineDocumentScanner className="inline-block mr-2" />
            Project Documents
          </h2>
          <Button
            type="primary"
            onClick={handleViewAllDocuments}
            className="bg-indigo-600 hover:bg-indigo-700 transition-all"
          >
            See All Documents
          </Button>
        </div>

        {documentDataLoading ? (
          <div className="flex justify-center p-10">
            <Spin />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentData?.data?.result?.length > 0 ? (
              documentData?.data?.result?.map((item) => (
                <Link
                  key={item?._id}
                  target="_blank"
                  to={item?.document_url}
                  className="mb-3 hover:opacity-80 transition-opacity"
                >
                  <Card className="overflow-hidden !h-48 transition-all duration-300">
                    <div className="flex flex-col items-start">
                      <Image
                        preview={false}
                        className="!w-24 !h-24 object-contain"
                        src={pdf}
                        alt="PDF document"
                      />

                      <h3 className="text-lg font-medium text-start text-gray-800 mb-1">
                        {item?.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {new Date(item?.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-sm text-gray-600 text-start">
                        {item?.description}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-full">
                <Empty description="No project documents available" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Project Details Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-6 text-gray-700 border-b pb-2">
          <MdPerson className="inline-block mr-2" />
          Project Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-lg p-5 shadow-sm">
            <div className="flex items-center mb-2">
              <MdEmail className="text-blue-600 mr-2 text-xl" />
              <h3 className="text-lg font-medium text-gray-700">
                Project Owner Email
              </h3>
            </div>
            <p className="bg-white rounded-lg p-3 border border-blue-100">
              {projectData?.projectOwnerEmail || 'Not available'}
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg p-5 shadow-sm">
            <div className="flex items-center mb-2">
              <MdPerson className="text-purple-600 mr-2 text-xl" />
              <h3 className="text-lg font-medium text-gray-700">
                Project Name
              </h3>
            </div>
            <p className="bg-white rounded-lg p-3 border border-purple-100">
              {projectData?.name || 'Not available'}
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-5 shadow-sm col-span-1 md:col-span-2">
            <div className="flex items-center mb-2">
              <MdOutlineDocumentScanner className="text-green-600 mr-2 text-xl" />
              <h3 className="text-lg font-medium text-gray-700">
                Project Title
              </h3>
            </div>
            <p className="bg-white rounded-lg p-3 border border-green-100">
              {projectData?.title || 'Not available'}
            </p>
          </div>

          <div className="bg-amber-50 rounded-lg p-5 shadow-sm">
            <div className="flex items-center mb-2">
              <MdDateRange className="text-amber-600 mr-2 text-xl" />
              <h3 className="text-lg font-medium text-gray-700">
                Project Start Date
              </h3>
            </div>
            <p className="bg-white rounded-lg p-3 border border-amber-100">
              {projectData?.startDate
                ? new Date(projectData.startDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : 'Not available'}
            </p>
          </div>

          <div className="bg-indigo-50 rounded-lg p-5 shadow-sm">
            <div className="flex items-center mb-2">
              <MdLink className="text-indigo-600 mr-2 text-xl" />
              <h3 className="text-lg font-medium text-gray-700">
                Project Stream Link
              </h3>
            </div>
            <p className="bg-white rounded-lg p-3 border border-indigo-100">
              {projectData?.liveLink ? (
                <a
                  href={projectData.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {projectData.liveLink}
                </a>
              ) : (
                'No link available'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Project Team Section */}
      <div>
        <h2 className="text-xl font-semibold mb-6 text-gray-700 border-b pb-2">
          <FaUserTie className="inline-block mr-2" />
          Project Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Project Manager */}
          {renderManagerCard(
            'Project Manager',
            projectData?.projectManager?.[0] || null,
            'blue',
            'blue'
          )}

          {/* Finance Manager */}
          {renderManagerCard(
            'Finance Manager',
            projectData?.financeManager?.[0] || null,
            'green',
            'green'
          )}

          {/* Office Manager */}
          {renderManagerCard(
            'Office Manager',
            projectData?.officeManager?.[0] || null,
            'purple',
            'purple'
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
