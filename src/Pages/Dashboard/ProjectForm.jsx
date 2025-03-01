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
} from 'antd';
import { UploadOutlined, FilePdfOutlined } from '@ant-design/icons';
import { MdDeleteForever } from 'react-icons/md';
import PageHeading from '../../Components/Shared/PageHeading';

const { Title, Text } = Typography;

const ProjectForm = () => {
  const [form] = Form.useForm();
  const [projectImage, setProjectImage] = useState(null);
  const [projectImageUrl, setProjectImageUrl] = useState('');
  const [documentation, setDocumentation] = useState(null);
  const [documentationName, setDocumentationName] = useState('');
  const [projectManagerAssigned, setProjectManagerAssigned] = useState(false);
  const [officeManagerAssigned, setOfficeManagerAssigned] = useState(false);
  const [financeManagerAssigned, setFinanceManagerAssigned] = useState(false);

  const onFinish = (values) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (key !== 'projectImage' && key !== 'documentation') {
        formData.append(key, values[key] || '');
      }
    });

    if (projectImage) {
      formData.append('projectImage', projectImage);
    }

    if (documentation) {
      formData.append('documentation', documentation);
    }

    if (values.projectStartDate) {
      formData.append(
        'projectStartDate',
        values.projectStartDate.format('DD/MM/YYYY')
      );
    }

    formData.append('projectManagerAssigned', projectManagerAssigned);
    formData.append('officeManagerAssigned', officeManagerAssigned);
    formData.append('financeManagerAssigned', financeManagerAssigned);

    const formDataObject = {
      Add_ProjectImage: projectImage,
      Documentations: documentation?.file,
      Project_Owner_Email: values.projectOwnerEmail,
      Project_Name: values.projectName,
      Project_Title: values.projectTitle,
      Project_Start_Date: values.projectStartDate
        ? values.projectStartDate.format('DD/MM/YYYY')
        : new Date().toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }),
      Live_Stream_Link: values.liveStreamLink,
      Select_Project_Manager_assign: projectManagerAssigned,
      Select_Office_Manager_assign: officeManagerAssigned,
      Select_Finance_Manager_assign: financeManagerAssigned,
    };

    console.log(formDataObject);
  };

  const handleProjectImageChange = (info) => {
    console.log(info.file);
    if (info.file) {
      setProjectImage(info.file);

      const url = URL.createObjectURL(info.file);
      setProjectImageUrl(url);
    }
  };

  const handleDocumentationChange = (info) => {
    if (info) {
      setDocumentation(info);
      setDocumentationName(info.file.name);
    }
  };

  const projectImageUploadProps = {
    beforeUpload: (file) => {
      return false;
    },
    onChange: handleProjectImageChange,
    showUploadList: false,
  };

  const documentationUploadProps = {
    beforeUpload: (file) => {
      return false;
    },
    onChange: handleDocumentationChange,
    showUploadList: false,
    accept: '.pdf,.doc,.docx,.txt',
  };

  const toggleProjectManager = () => {
    setProjectManagerAssigned(!projectManagerAssigned);
  };

  const toggleOfficeManager = () => {
    setOfficeManagerAssigned(!officeManagerAssigned);
  };

  const toggleFinanceManager = () => {
    setFinanceManagerAssigned(!financeManagerAssigned);
  };

  return (
    <div>
      <PageHeading text={'Back to table'}></PageHeading>
      <Form form={form} layout="vertical" onFinish={onFinish} className="!mt-3 p-6">
        <Row gutter={24}>
          <Col span={12}>
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
          <Col span={12}>
            <Form.Item
              name="documentation"
              label={
                <Title level={4} className="text-gray-700 mb-2">
                  Documentations
                </Title>
              }
            >
              <Card className="h-64 !border-2 !border-dashed !border-gray-300 flex items-center justify-center">
                {documentationName ? (
                  <div className="text-center">
                    <FilePdfOutlined className="text-4xl text-blue-500" />
                    <div className="mt-2 text-gray-700 font-medium">
                      {documentationName}
                    </div>
                    <Button
                      type="link"
                      className="mt-2"
                      onClick={() => {
                        setDocumentationName('');
                        setDocumentation(null);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <Upload {...documentationUploadProps}>
                    <div className="text-center p-4">
                      <FilePdfOutlined className="text-4xl text-gray-300" />
                      <div className="mt-2 text-gray-500 font-medium">
                        Upload Your Documentation
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
            >
              <Input
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
          <Col span={2} className="text-center">
            <Switch
              checked={projectManagerAssigned}
              onChange={toggleProjectManager}
              className="bg-gray-300"
            />
          </Col>
          <Col span={4}>
            {projectManagerAssigned ? (
              <div className="bg-[#213555] text-white w-fit px-2 py-1 rounded">
                Assigned
              </div>
            ) : (
              <div className="bg-white w-fit px-2 py-1 rounded">Assigned</div>
            )}
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
          <Col span={2} className="text-center">
            <Switch
              checked={officeManagerAssigned}
              onChange={toggleOfficeManager}
              className="bg-gray-300"
            />
          </Col>
          <Col span={4}>
            {officeManagerAssigned ? (
              <div className="bg-[#213555] text-white w-fit px-2 py-1 rounded">
                Assigned
              </div>
            ) : (
              <div className="bg-white w-fit px-2 py-1 rounded">Assigned</div>
            )}{' '}
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
          <Col span={2} className="text-center">
            <Switch
              checked={financeManagerAssigned}
              onChange={toggleFinanceManager}
              className="bg-gray-300"
            />
          </Col>
          <Col span={4}>
            {financeManagerAssigned ? (
              <div className="bg-[#213555] text-white w-fit px-2 py-1 rounded">
                Assigned
              </div>
            ) : (
              <div className="bg-white w-fit px-2 py-1 rounded">Assigned</div>
            )}
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
    </div>
  );
};

export default ProjectForm;
