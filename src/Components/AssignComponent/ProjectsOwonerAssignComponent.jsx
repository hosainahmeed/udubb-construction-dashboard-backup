import { Button, Card, Col, Form, Row, Typography } from 'antd';
import React from 'react';
const { Title, Text } = Typography;
function ProjectsOwonerAssignComponent({setProjectsOwnerModal}) {
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
            <Button
              onClick={() => setProjectsOwnerModal(true)}
              className={`!bg-[#213555] !text-white w-fit px-2 py-1 rounded`}
            >
              Assign
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default ProjectsOwonerAssignComponent;
