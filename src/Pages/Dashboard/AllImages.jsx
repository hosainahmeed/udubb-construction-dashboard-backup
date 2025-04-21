import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { MdPhoto, MdOutlineExpandMore } from 'react-icons/md';
import {
  Card,
  Empty,
  Spin,
  Pagination,
  Image,
  Modal,
  Button,
  Row,
  Col,
} from 'antd';
import PageHeading from '../../Components/Shared/PageHeading';
import { useGetProjectsImagsQuery } from '../../Redux/services/pagesApisServices/projectApis';
import { imageUrl } from '../../Utils/server';

function AllImages() {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { data: projectImags, isLoading: projectImagsLoading } =
    useGetProjectsImagsQuery({
      id: location?.state,
      page: currentPage,
      limit: 9,
    });

  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  // Function to truncate text to a specified length
  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength
      ? text.substring(0, maxLength) + '...'
      : text;
  };

  return (
    <div className="px-4 py-6 bg-white rounded-lg shadow-sm">
      <PageHeading text={'Project Gallery'} />
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
            <MdPhoto className="inline-block mr-2" />
            All Project Images
          </h2>
        </div>

        {projectImagsLoading ? (
          <div className="flex justify-center p-10">
            <Spin size="large" tip="Loading images..." />
          </div>
        ) : (
          <div>
            {projectImags?.data?.result?.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {projectImags?.data?.result?.map((item) => (
                  <Card
                    key={item?._id}
                    className="overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl"
                    bodyStyle={{ padding: '16px' }}
                  >
                    <Row gutter={16} align="middle">
                      <Col xs={24} sm={10} md={8}>
                        <div className="relative overflow-hidden rounded-md">
                          <Image
                            preview={false}
                            className="w-full aspect-square object-cover cursor-pointer"
                            src={
                              item?.image_url
                                ? imageUrl(item?.image_url)
                                : 'https://via.placeholder.com/150'
                            }
                            alt={item?.title || 'Project image'}
                            onClick={() => openModal(item)}
                          />
                        </div>
                      </Col>
                      <Col xs={24} sm={14} md={16}>
                        <div className="pt-4 sm:pt-0">
                          <h3 className="text-lg font-medium text-gray-800 mb-2">
                            {item?.title || 'Untitled Image'}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {truncateText(item?.description, 120)}
                          </p>
                          <Button
                            type="primary"
                            onClick={() => openModal(item)}
                            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700"
                          >
                            <MdOutlineExpandMore /> See More
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-10 bg-gray-50 rounded-lg">
                <Empty description="No project images available" />
                <p className="mt-4 text-gray-500">
                  No images have been uploaded for this project yet.
                </p>
              </div>
            )}

            {/* Pagination Component */}
            {projectImags?.data?.meta?.total > 0 && (
              <div className="flex justify-center mt-8">
                <Pagination
                  current={currentPage}
                  pageSize={9}
                  total={projectImags?.data?.meta?.total}
                  onChange={handlePaginationChange}
                  showSizeChanger={false}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal for displaying full image and description */}
      <Modal
        open={modalVisible}
        onCancel={closeModal}
        footer={null}
        width={800}
        centered
        className="image-detail-modal"
      >
        {selectedImage && (
          <div className="p-2">
            <div className="mb-6">
              <Image
                src={imageUrl(selectedImage?.image_url)}
                alt={selectedImage?.title}
                className="w-full object-contain max-h-96"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                {selectedImage?.title}
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 whitespace-pre-line">
                  {selectedImage?.description}
                </p>
              </div>
              <div className="mt-4 text-gray-500 text-sm">
                Added on:{' '}
                {new Date(selectedImage?.createdAt).toLocaleDateString(
                  'en-US',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default AllImages;
