import { Button, Card, Col, Form, Image, Row, Typography } from 'antd';
import React from 'react';
import { imageUrl } from '../../Utils/server';
import { useGetAllUserQuery } from '../../Redux/services/pagesApisServices/userApis';
import { MdDelete } from 'react-icons/md';
import toast from 'react-hot-toast';
const { Title, Text } = Typography;
function ProjectsOwonerAssignComponent({
  setProjectsOwnerModal,
  projectOwner,
}) {
  const {
    data: OwnerData,
    isLoading,
    refetch,
  } = useGetAllUserQuery({
    role: 'user',
  });
  const id = localStorage.getItem('projectOwner');
  const filterData = OwnerData?.data?.result?.filter(
    (item) => item?._id === id
  );
  const Assign = id ? 'Change' : 'Assign';

  return (
    <div>
      <Card>
        <Row gutter={24} className="mt-4 items-center">
          <Col span={18}>
            <Form.Item
              label={
                <Title level={5} className="text-gray-700 mb-1">
                  Project Owner
                </Title>
              }
            >
              <Text className="text-gray-600">Please Select Project Owner</Text>
            </Form.Item>
          </Col>

          <Col span={4}>
            {projectOwner ? (
              <Button
                onClick={() => setProjectsOwnerModal(true)}
                className={`!bg-[#213555] !text-white w-fit px-2 py-1 rounded`}
              >
                Change
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={() => setProjectsOwnerModal(true)}
                  className={`${
                    id && '!bg-[#213555] !text-white'
                  }  w-fit px-2 py-1 rounded`}
                >
                  {Assign}
                </Button>
                {id && (
                  <Button
                    shape="circle"
                    onClick={() => {
                      localStorage.removeItem('projectOwner');
                      toast.success('Project Owner removed!');
                      refetch();
                    }}
                    className={`!bg-red-500 !text-white w-fit px-2 py-1 rounded`}
                  >
                    <MdDelete />
                  </Button>
                )}
              </div>
            )}
          </Col>
        </Row>
        {projectOwner && (
          <Row gutter={24} className="mt-4 items-center">
            <div className="flex items-start gap-2">
              <Image
                src={imageUrl(projectOwner?.profile_image)}
                className="!w-16 !h-12 object-cover rounded-md overflow-hidden"
                alt={projectOwner?.name}
              />
              <div>
                <p className="text-base leading-none">{projectOwner?.name}</p>
                <p className="text-[#808080] leading-none text-sm">
                  {projectOwner?.email}
                </p>
              </div>
            </div>
          </Row>
        )}
        {filterData?.length > 0 && !projectOwner && (
          <Row gutter={24} className="mt-4 items-center">
            <div className="flex items-start gap-2">
              <Image
                src={imageUrl(filterData[0]?.profile_image)}
                className="!w-16 !h-12 object-cover rounded-md overflow-hidden"
                alt={filterData[0]?.name}
              />
              <div>
                <p className="text-base leading-none">{filterData[0]?.name}</p>
                <p className="text-[#808080] leading-none text-sm">
                  {filterData[0]?.email}
                </p>
              </div>
            </div>
          </Row>
        )}
      </Card>
    </div>
  );
}

export default ProjectsOwonerAssignComponent;
