import React, { useState } from 'react';
import {
  Button,
  Card,
  Image,
  Spin,
  Empty,
  Modal,
  Tag,
  Tabs,
  Descriptions,
  Avatar,
  List,
  Collapse,
  Space,
  Typography,
} from 'antd';
import { Link, useParams, useNavigate } from 'react-router';
import {
  useGetProjectsImagsQuery,
  useGetSingleProjectQuery,
} from '../../Redux/services/pagesApisServices/projectApis';
import { imageUrl } from '../../Utils/server';
import {
  EditOutlined,
  FileTextOutlined,
  MailOutlined,
  UserOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import { useProjectsDocumentQuery } from '../../Redux/services/pagesApisServices/doucmentApis';
import pdfIcon from '../../assets/pdf.png';
import './ProjectDetails.css';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;

function ProjectDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [limit] = useState(3);
  const [activeTab, setActiveTab] = useState('overview');

  const { data: project, isLoading: projectsLoading } =
    useGetSingleProjectQuery({ id: params?.id });
  const { data: projectImags, isLoading: projectImagsLoading } =
    useGetProjectsImagsQuery({ id: params?.id, limit: limit });
  const { data: documentData, isLoading: documentDataLoading } =
    useProjectsDocumentQuery({ id: project?.data?._id, limit: limit });

  const projectData = project?.data;
  const projectImages = projectImags?.data?.result;
  const documents = documentData?.data?.result;

  const handleViewAll = (type) => {
    navigate(`/all-${type}`, { state: projectData?._id });
  };

  if (projectsLoading) {
    return (
      <div className="project-details-loading">
        <Spin size="large" tip="Loading project details..." />
      </div>
    );
  }

  const renderManagerInfo = (manager, title) => {
    if (!manager) return <Empty description={`No ${title} assigned`} />;

    if (Array.isArray(manager)) {
      return (
        <List
          dataSource={manager}
          renderItem={(m) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src={imageUrl(m?.profile_image)} size="large" />
                }
                title={<Text strong>{m.name}</Text>}
                description={
                  <Space direction="vertical" size={0}>
                    <Text>
                      <MailOutlined /> {m.email}
                    </Text>
                    {m.phone && (
                      <Text>
                        <UserOutlined /> {m.phone}
                      </Text>
                    )}
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      );
    }

    return (
      <Descriptions bordered column={1} size="small">
        <Descriptions.Item label="Name">{manager.name}</Descriptions.Item>
        <Descriptions.Item label="Email">
          <a href={`mailto:${manager.email}`}>{manager.email}</a>
        </Descriptions.Item>
        {manager.phone && (
          <Descriptions.Item label="Phone">{manager.phone}</Descriptions.Item>
        )}
        {manager.address && (
          <Descriptions.Item label="Address">
            {manager.address}
          </Descriptions.Item>
        )}
      </Descriptions>
    );
  };

  const renderImageGallery = () => (
    <div className="image-gallery-section">
      <div className="section-header">
        <Title level={4} className="section-title">
          <PictureOutlined /> Gallery
        </Title>
        <Button
          type="link"
          onClick={() => handleViewAll('image')}
          icon={<FileTextOutlined />}
        >
          View All
        </Button>
      </div>

      {projectImagsLoading ? (
        <Spin />
      ) : (
        <div className="image-grid">
          {projectImages?.length > 0 ? (
            projectImages.slice(0, 3).map((image) => (
              <div key={image?._id} className="image-card">
                <Image
                  preview
                  src={imageUrl(image?.image_url)}
                  alt={image?.title || projectData?.name}
                  className="gallery-image"
                />
                <div className="image-info">
                  <Text strong>{image?.title || 'Untitled'}</Text>
                  {image?.description && (
                    <Text type="secondary" ellipsis>
                      {image?.description}
                    </Text>
                  )}
                </div>
              </div>
            ))
          ) : (
            <Empty description="No images available" />
          )}
        </div>
      )}
    </div>
  );

  const renderDocuments = () => (
    <div className="documents-section">
      <div className="section-header">
        <Title level={4} className="section-title">
          <FileTextOutlined /> Documents
        </Title>
        <Button
          type="link"
          onClick={() => handleViewAll('document')}
          icon={<FileTextOutlined />}
        >
          View All
        </Button>
      </div>

      {documentDataLoading ? (
        <Spin />
      ) : (
        <div className="documents-grid">
          {documents?.length > 0 ? (
            documents.slice(0, 3).map((doc) => (
              <Card
                key={doc?._id}
                hoverable
                className="document-card"
                onClick={() => window.open(doc?.document_url, '_blank')}
              >
                <div className="document-content">
                  <img src={pdfIcon} alt="PDF" className="document-icon" />
                  <div className="document-info">
                    <Text strong ellipsis>
                      {doc?.title}
                    </Text>
                    <Text type="secondary">
                      {new Date(doc?.createdAt).toLocaleDateString()}
                    </Text>
                    {doc?.description && (
                      <Paragraph ellipsis={{ rows: 2 }} type="secondary">
                        {doc?.description}
                      </Paragraph>
                    )}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Empty description="No documents available" />
          )}
        </div>
      )}
    </div>
  );

  const renderProjectInfo = () => (
    <Descriptions bordered column={2} className="project-info">
      <Descriptions.Item label="Project Name">
        <Text strong>{projectData?.name}</Text>
      </Descriptions.Item>
      <Descriptions.Item label="Title">
        {projectData?.title || 'N/A'}
      </Descriptions.Item>
      <Descriptions.Item label="Start Date">
        {projectData?.startDate
          ? new Date(projectData?.startDate).toLocaleDateString()
          : 'N/A'}
      </Descriptions.Item>
      <Descriptions.Item label="Live Link">
        {projectData?.liveLink ? (
          <a
            href={projectData?.liveLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {projectData?.liveLink}
          </a>
        ) : (
          'N/A'
        )}
      </Descriptions.Item>
    </Descriptions>
  );

  const renderTeamSection = () => (
    <Collapse expandIconPosition="end" bordered>
      <Panel header="Project Owner" key="1">
        {renderManagerInfo(projectData?.projectOwner, 'Project Owner')}
      </Panel>
      <Panel header="Project Manager" key="2">
        {renderManagerInfo(projectData?.projectManager, 'Project Manager')}
      </Panel>
      <Panel header="Finance Manager" key="3">
        {renderManagerInfo(projectData?.financeManager, 'Finance Manager')}
      </Panel>
      <Panel header="Office Manager" key="4">
        {renderManagerInfo(projectData?.officeManager, 'Office Manager')}
      </Panel>
    </Collapse>
  );

  return (
    <div className="project-details-container">
      <div className="project-header">
        <div>
          <Title level={2} className="project-title">
            {projectData?.name}
          </Title>
          <Text type="secondary">{projectData?.title}</Text>
        </div>
        <Link to="/edit-project" state={params.id}>
          <Button type="primary" icon={<EditOutlined />}>
            Edit Project
          </Button>
        </Link>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        className="project-tabs"
      >
        <TabPane tab="Overview" key="overview">
          <Card title="Project Information" className="info-card">
            {renderProjectInfo()}
          </Card>

          {renderImageGallery()}

          {renderDocuments()}
        </TabPane>

        <TabPane tab="Team" key="team">
          <Card title="Project Team" className="team-card">
            {renderTeamSection()}
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ProjectDetails;
