import {
  Button,
  Card,
  Col,
  Collapse,
  Form,
  Image,
  Row,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { imageUrl } from '../../Utils/server';
import { useGetAllUserQuery } from '../../Redux/services/pagesApisServices/userApis';
import { MdDelete } from 'react-icons/md';
import useProjectsCreate from '../../contexts/hooks/useProjectsCreate';

const { Title, Text } = Typography;
const { Panel } = Collapse;

function ProjectsOwonerAssignComponent({
  setProjectsOwnerModal,
  projectOwner,
}) {
  const [selectedOwner, setSelectedOwner] = useState(null);
  const { projectOwnerAssigned, setProjectOwnerAssigned } = useProjectsCreate();
  const {
    data: OwnerData,
    isLoading,
    refetch,
  } = useGetAllUserQuery({
    role: 'user',
    limit: 999,
  });

  const id = localStorage.getItem('projectOwner');
  const projectId = id ? JSON.parse(id) : null;

  // Filter users based on projectOwnerAssigned IDs
  const assignedOwners =
    OwnerData?.data?.result?.filter((user) =>
      projectOwnerAssigned?.includes(user._id)
    ) || [];

  useEffect(() => {
    if (projectOwner) {
      setSelectedOwner(
        Array.isArray(projectOwner) ? projectOwner : [projectOwner]
      );
    }
  }, [projectOwner]);

  useEffect(() => {
    if (id && OwnerData?.data?.result) {
      const filterData = OwnerData.data.result.filter(
        (item) => item._id === id
      );
      if (filterData.length > 0) {
        setSelectedOwner([filterData[0]]);
      }
    }
  }, [id, OwnerData]);

  const Assign = selectedOwner ? 'Change' : 'Assign';

  const handleDelete = async (id) => {
    const updatedList = projectOwnerAssigned.filter((item) => item !== id);
    setProjectOwnerAssigned(updatedList);
  };

  return (
    <div>
      <Card>
        <Row gutter={24} className="mt-4 items-center">
          <Col span={18}>
            <Form.Item
              label={
                <Title level={5} className="text-gray-700 mb-1">
                  Project Owner ({projectOwnerAssigned.length})
                </Title>
              }
            >
              <Text className="text-gray-600">Please Select Project Owner</Text>
            </Form.Item>
          </Col>

          <Button
            onClick={() => setProjectsOwnerModal(true)}
            className={`${
              selectedOwner ? '!bg-[#213555] !text-white' : ''
            } w-fit px-2 py-1 rounded`}
          >
            {Assign}
          </Button>
        </Row>

        {/* Selected owner from localStorage */}
        {Array.isArray(selectedOwner) && selectedOwner.length > 0 ? (
          <div className="mb-3">
            {selectedOwner.map((item, idx) => (
              <div key={idx} className="mb-3">
                <Card key={idx}>
                  <div className="flex items-start gap-4">
                    <div className="flex w-full !mb-3 items-center justify-between">
                      {item?.profile_image && (
                        <Image
                          src={imageUrl(item?.profile_image)}
                          className="!w-16 !h-12 object-cover rounded-md overflow-hidden"
                          alt={item?.name}
                          fallback="https://i.ibb.co.com/PsxKbMWH/defult-Image.jpg"
                        />
                      )}
                      <div>
                        <p className="text-base leading-none">{item?.name}</p>
                        <p className="text-[#808080] leading-none text-sm">
                          {item?.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setProjectsOwnerModal(true)}
                        className={`${
                          selectedOwner ? '!bg-[#213555] !text-white' : ''
                        } w-fit px-2 py-1 rounded`}
                      >
                        {Assign}
                      </Button>
                      {selectedOwner && (
                        <Button
                          shape="circle"
                          onClick={() => handleDelete(item._id)}
                          className="!bg-white !text-black w-fit px-2 py-1 rounded"
                        >
                          <MdDelete />
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        ) : null}

        {/* Assigned owners from projectOwnerAssigned */}
        {assignedOwners.length > 0 && (
          <Card>
            {assignedOwners.map((item, idx) => (
              <div className="mb-3" key={idx}>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-start gap-4">
                    {item?.profile_image && (
                      <Image
                        src={imageUrl(item?.profile_image)}
                        className="!w-16 !h-12 object-cover rounded-md overflow-hidden"
                        alt={item?.name}
                        fallback="https://i.ibb.co.com/PsxKbMWH/defult-Image.jpg"
                      />
                    )}
                    <div>
                      <p className="text-base leading-none">{item?.name}</p>
                      <p className="text-[#808080] leading-none text-sm">
                        {item?.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {/* <Button
                      onClick={() => setProjectsOwnerModal(true)}
                      className={`${
                        assignedOwners.length ? '!bg-[#213555] !text-white' : ''
                      } w-fit px-2 py-1 rounded`}
                    >
                      {Assign}
                    </Button> */}
                    <Button
                      shape="circle"
                      onClick={() => handleDelete(item._id)}
                      className="!bg-white !text-black w-fit px-2 py-1 rounded"
                    >
                      <MdDelete />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </Card>
        )}
      </Card>
    </div>
  );
}

export default ProjectsOwonerAssignComponent;
