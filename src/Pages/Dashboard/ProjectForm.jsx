import React, { useState } from 'react';
import {
  Form,
  Input,
  DatePicker,
  Button,
  Upload,
  Switch,
  Row,
  Col,
  Card,
  Typography,
  message,
  Modal,
} from 'antd';
import { UploadOutlined, FilePdfOutlined } from '@ant-design/icons';
import { MdDeleteForever } from 'react-icons/md';
import PageHeading from '../../Components/Shared/PageHeading';
import { useCreateProjectsMutation } from '../../Redux/services/pagesApisServices/projectApis';
import ProjectsManagerModal from './Projects/Modal/ProjectsManagerModal';

const { Title, Text } = Typography;

const ProjectForm = () => {
  const [form] = Form.useForm();
  const [projectImage, setProjectImage] = useState(null);
  const [projectImageUrl, setProjectImageUrl] = useState('');
  const [projectsManagerModal, setProjectsManagerModal] = useState(false); //setProjectManagerAssigned
  const [projectManagerAssigned, setProjectManagerAssigned] = useState(null);
  const [officeManagerAssigned, setOfficeManagerAssigned] = useState(false);
  const [financeManagerAssigned, setFinanceManagerAssigned] = useState(false);
  const [createProject, { isLoading }] = useCreateProjectsMutation();

  const onFinish = async (values) => {
    const formData = new FormData();

    if (projectImage) {
      formData.append('project_image', projectImage);
    }

    const dataPayload = {
      name: values.projectName,
      projectOwnerEmail: values.projectOwnerEmail,
      title: values.projectTitle,
      startDate: values.projectStartDate
        ? values.projectStartDate.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        : new Date().toISOString(),
      liveLink: values.liveStreamLink,
      projectManager: projectManagerAssigned,
      officeManager: officeManagerAssigned,
      financeManager: financeManagerAssigned,
    };

    Object.entries(dataPayload).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await createProject(formData).unwrap();
      if (response) {
        message.success('Project created successfully!');
        form.resetFields();
        setProjectImage(null);
        setProjectImageUrl('');
      }
    } catch (error) {
      message.error(
        'Failed to create project: ' + (error?.data?.message || 'Unknown error')
      );
      console.error(error);
    }
  };
  const handleProjectImageChange = (info) => {
    console.log(info.file);
    const file = info.file;
    if (file) {
      setProjectImage(file);
      const url = URL.createObjectURL(file);
      setProjectImageUrl(url);
    }
  };

  const projectImageUploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return false;
      }
      return false;
    },
    onChange: handleProjectImageChange,
    showUploadList: false,
  };

  return (
    <div>
      <PageHeading text={'Back to table'}></PageHeading>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="!mt-3 p-6"
        initialValues={{
          name: 'projectName',
          projectOwnerEmail: 'projectsOwnerEmail',
          title: 'projectTitle',
          startDate: 'projectStartDate',
          liveLink: 'liveStreamLink',
          projectManager: projectManagerAssigned,
          officeManager: officeManagerAssigned,
          financeManager: financeManagerAssigned,
        }}
      >
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              name="projectImage"
              label={
                <Title level={4} className="text-gray-700 mb-2">
                  Add Project Image
                </Title>
              }
            >
              <Card className="h-64 !border-2 !border-dashed !border-gray-300 flex items-center justify-center overflow-hidden">
                {projectImageUrl ? (
                  <div className="w-full h-full relative">
                    <img
                      src={projectImageUrl}
                      alt="Project Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute w-full h-full pointer-events-none flex items-center justify-center bottom-2 !z-[9999] right-2">
                      <Button
                        type="primary"
                        size="small"
                        className="!pointer-events-auto"
                        onClick={() => {
                          setProjectImageUrl('');
                          setProjectImage(null);
                        }}
                      >
                        <MdDeleteForever />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Upload {...projectImageUploadProps}>
                    <div className="text-center p-4">
                      <UploadOutlined className="text-4xl text-gray-300" />
                      <div className="mt-2 text-gray-500 font-medium">
                        Upload project image
                      </div>
                    </div>
                  </Upload>
                )}
              </Card>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="projectOwnerEmail"
              label={
                <Title level={5} className="text-gray-700 mb-1">
                  Project Owner Email
                </Title>
              }
              rules={[
                {
                  required: true,
                  message: 'Please enter project owner email',
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email',
                },
              ]}
            >
              <Input
                type="email"
                placeholder="enter project owner email here..."
                className="rounded-md py-2"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="projectName"
              label={
                <Title level={5} className="text-gray-700 mb-1">
                  Project Name
                </Title>
              }
              rules={[{ required: true, message: 'Please enter project name' }]}
            >
              <Input
                placeholder="enter project name here..."
                className="rounded-md py-2"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              name="projectTitle"
              label={
                <Title level={5} className="text-gray-700 mb-1">
                  Project Title
                </Title>
              }
              rules={[
                { required: true, message: 'Please enter project title' },
              ]}
            >
              <Input
                placeholder="enter project title here..."
                className="rounded-md py-2"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="projectStartDate"
              label={
                <Title level={5} className="text-gray-700 mb-1">
                  Project Start Date
                </Title>
              }
            >
              <DatePicker
                format="DD/MM/YYYY"
                placeholder="dd/mm/yyyy"
                className="w-full rounded-md py-2"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="liveStreamLink"
              label={
                <Title level={5} className="text-gray-700 mb-1">
                  Live Stream Link
                </Title>
              }
            >
              <Input placeholder="link here..." className="rounded-md py-2" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24} className="mt-4 items-center">
          <Col span={18}>
            <Form.Item
              label={
                <Title level={5} className="text-gray-700 mb-1">
                  Select Project Manager
                </Title>
              }
            >
              <Text className="text-gray-600">Select Project Manager</Text>
            </Form.Item>
          </Col>

          <Col span={4}>
            <Button
              onClick={() => setProjectsManagerModal(true)}
              className="!bg-[#213555] !text-white w-fit px-2 py-1 rounded"
            >
              Assigned
            </Button>
          </Col>
        </Row>

        <Row gutter={24} className="mt-4 items-center">
          <Col span={18}>
            <Form.Item
              label={
                <Title level={5} className="text-gray-700 mb-1">
                  Select Office Manager
                </Title>
              }
            >
              <Text className="text-gray-600">Select Office Manager</Text>
            </Form.Item>
          </Col>

          <Col span={4}>
            <Button className="!bg-[#213555] !text-white w-fit px-2 py-1 rounded">
              Assigned
            </Button>
          </Col>
        </Row>

        <Row gutter={24} className="mt-4 items-center">
          <Col span={18}>
            <Form.Item
              label={
                <Title level={5} className="text-gray-700 mb-1">
                  Select Finance Manager
                </Title>
              }
            >
              <Text className="text-gray-600">Select Finance Manager</Text>
            </Form.Item>
          </Col>

          <Col span={4}>
            <Button className="!bg-[#213555] !text-white w-fit px-2 py-1 rounded">
              Assigned
            </Button>
          </Col>
        </Row>

        <Row>
          <Col span={24} className="mt-10">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full py-3 h-auto text-lg font-medium !bg-[#213555] rounded-md"
              >
                Create Project
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Modal
        open={projectsManagerModal}
        onCancel={() => setProjectsManagerModal(false)}
        footer={null}
        width={800}
      >
        <ProjectsManagerModal />
      </Modal>
    </div>
  );
};

export default ProjectForm;
