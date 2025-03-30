import { Button, Card, Col, Form, Image, Row, Typography } from 'antd';
import React from 'react';
import { imageUrl } from '../../Utils/server';
const { Title, Text } = Typography;
function ProjectsOwonerAssignComponent({
  setProjectsOwnerModal,
  projectOwner,
}) {
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
              <Button
                onClick={() => setProjectsOwnerModal(true)}
                className={`!bg-[#213555] !text-white w-fit px-2 py-1 rounded`}
              >
                Assign
              </Button>
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
      </Card>
    </div>
  );
}

export default ProjectsOwonerAssignComponent;
