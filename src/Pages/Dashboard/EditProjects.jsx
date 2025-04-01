import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  DatePicker,
  Button,
  Upload,
  Row,
  Col,
  Card,
  Typography,
  message,
  Modal,
  Image,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { MdDeleteForever } from 'react-icons/md';
import moment from 'moment'; // Import moment for date handling
import PageHeading from '../../Components/Shared/PageHeading';
import {
  useGetSingleProjectQuery,
  useUpdateProjectMutation,
} from '../../Redux/services/pagesApisServices/projectApis';
import ProjectsManagerModal from './Projects/Modal/ProjectsManagerModal';
import OfficeManager from './Projects/Modal/OfficeManager';
import FinanceMangers from './Projects/Modal/FinanceMangers';
import ProjectsWoners from './Projects/Modal/ProjectsWoners';
import ProjectsOwonerAssignComponent from '../../Components/AssignComponent/ProjectsOwonerAssignComponent';
import ProjectsManagerAssignComponent from '../../Components/AssignComponent/ProjectsManagerAssignComponent';
import OfficeManagerAssignComponent from '../../Components/AssignComponent/OfficeManagerAssignComponent';
import FinanceManagerAssignComponent from '../../Components/AssignComponent/FinanceManagerAssignComponent';
import { useLocation } from 'react-router';
import toast from 'react-hot-toast';

const { Title } = Typography;

const EditProjects = () => {
  const location = useLocation();
  const id = location?.state;
  const { data: projectData } = useGetSingleProjectQuery({ id: id });
  const project = projectData?.data;
  const [form] = Form.useForm();
  const [projectImage, setProjectImage] = useState(null);
  const [projectImageUrl, setProjectImageUrl] = useState('');
  const [projectsOwnerModal, setProjectsOwnerModal] = useState(false);
  const [projectsManagerModal, setProjectsManagerModal] = useState(false);
  const [OfficeManagerModal, setOfficeManagerModal] = useState(false);
  const [financeManagerModal, setFinanceManagerModal] = useState(false);
  const [projectOwnerAssigned, setProjectOwnerAssigned] = useState(null);
  const [projectManagerAssigned, setProjectManagerAssigned] = useState(null);
  const [officeManagerAssigned, setOfficeManagerAssigned] = useState(null);
  const [financeManagerAssigned, setFinanceManagerAssigned] = useState(null);
  const [updateProject, { isLoading: updateLoading }] =
    useUpdateProjectMutation();
  useEffect(() => {
    if (project) {
      form.setFieldsValue({
        projectName: project.name || '',
        projectOwnerEmail: project.projectOwnerEmail || '',
        projectTitle: project.title || '',
        projectStartDate: project.startDate ? moment(project.startDate) : null,
        liveStreamLink: project.liveLink || '',
      });

      if (project.projectImage) {
        setProjectImageUrl(project.projectImage);
      }

      if (project.projectManager)
        setProjectManagerAssigned(project.projectManager._id);
      if (project.officeManager)
        setOfficeManagerAssigned(project.officeManager._id);
      if (project.financeManager)
        setFinanceManagerAssigned(project.financeManager._id);
      if (project.projectOwner)
        setProjectOwnerAssigned(project.projectOwner._id);
    }
  }, [project, form]);

  const onFinish = async (values) => {
    const formData = new FormData();

    if (projectImage) {
      formData.append('project_images', projectImage);
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
      projectOwner: projectOwnerAssigned,
    };

    Object.entries(dataPayload).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    try {
      const response = await updateProject({ id, data: formData }).unwrap();
      if (response?.success) {
        localStorage.removeItem('projectManager');
        localStorage.removeItem('officeManager');
        localStorage.removeItem('financeManager');
        localStorage.removeItem('projectOwner');
        toast.success('Project updated successfully!');
      } else {
        toast.error(response?.message || 'Unknown error');
      }
    } catch (error) {
      toast.error(error?.message || 'Unknown error');
      console.error(error);
    }
  };

  const handleProjectImageChange = (info) => {
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
        requiredMark={false}
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="!mt-3 p-6"
      >
        <div className="flex items-start gap-2">
          <div className="flex-1">
            <Card>
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
                    <Card className="h-38 relative !border-2 !border-dashed !border-gray-300 flex items-center justify-center overflow-hidden">
                      {projectImageUrl ? (
                        <div className="w-full h-full relative">
                          <Image
                            src={projectImageUrl}
                            alt="Project Preview"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute w-full h-full pointer-events-none flex items-center justify-center bottom-2 !z-[888] right-2">
                            <Button
                              size="small"
                              className="!pointer-events-auto !bg-red-500 !text-white"
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
                        <Upload
                          className=" hover:!scale-102 !transition-all flex items-center justify-center !cursor-pointer !absolute !top-0 !left-0 !w-full !h-full !border-2 !border-dashed !border-gray-300"
                          {...projectImageUploadProps}
                        >
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
            </Card>
            <Card className="!mt-2">
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
                      placeholder="Enter project owner email here..."
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
                    rules={[
                      { required: true, message: 'Please enter project name' },
                    ]}
                  >
                    <Input
                      placeholder="Enter project name here..."
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
                      placeholder="Enter project title here..."
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
                    <Input
                      type="url"
                      placeholder="link here..."
                      className="rounded-md py-2"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={24} className="">
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={updateLoading}
                      className="w-full py-3 h-auto text-lg font-medium !bg-[#213555] rounded-md"
                    >
                      Update Project
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </div>
          <div className="flex-1">
            <Card>
              <ProjectsOwonerAssignComponent
                setProjectsOwnerModal={setProjectsOwnerModal} 
                projectOwner={project?.projectOwner}
              />
              <ProjectsManagerAssignComponent
                setProjectsManagerModal={setProjectsManagerModal}
                projectManager={project?.projectManager}
              />

              <OfficeManagerAssignComponent
                setOfficeManagerModal={setOfficeManagerModal}
                officeManager={project?.officeManager}
              />
              <FinanceManagerAssignComponent
                setFinanceManagerModal={setFinanceManagerModal}
                financeManager={project?.financeManager}
              />
            </Card>
          </div>
        </div>
      </Form>
      <Modal
        open={projectsManagerModal}
        onCancel={() => setProjectsManagerModal(false)}
        footer={null}
        width={800}
      >
        <ProjectsManagerModal
          setProjectsManagerModal={setProjectsManagerModal}
          setProjectManagerAssigned={setProjectManagerAssigned}
        />
      </Modal>
      <Modal
        open={OfficeManagerModal}
        onCancel={() => setOfficeManagerModal(false)}
        footer={null}
        width={800}
      >
        <OfficeManager
          setOfficeManagerModal={setOfficeManagerModal}
          setOfficeManagerAssigned={setOfficeManagerAssigned}
        />
      </Modal>
      <Modal
        open={financeManagerModal}
        onCancel={() => setFinanceManagerModal(false)}
        footer={null}
        width={800}
      >
        <FinanceMangers
          setFinanceManagerModal={setFinanceManagerModal}
          setFinanceManagerAssigned={setFinanceManagerAssigned}
        />
      </Modal>
      <Modal
        open={projectsOwnerModal}
        onCancel={() => setProjectsOwnerModal(false)}
        footer={null}
        width={800}
      >
        <ProjectsWoners
          setProjectsOwnerModal={setProjectsOwnerModal}
          setProjectOwnerAssigned={setProjectOwnerAssigned}
        />
      </Modal>
    </div>
  );
};

export default EditProjects;
