import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import PageHeading from '../Shared/PageHeading';
import { Card, Modal, Button, Pagination, Empty } from 'antd';
const { Meta } = Card;

function ProjectPhotos() {
  const location = useLocation();
  const data = location.state || { projectDetails: [] };

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [paginatedData, setPaginatedData] = useState([]);

  // Calculate total items
  const totalItems = data?.projectDetails?.length || 0;

  // Update paginated data when page or data changes
  useEffect(() => {
    if (data?.projectDetails?.length) {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      setPaginatedData(data.projectDetails.slice(startIndex, endIndex));
    } else {
      setPaginatedData([]);
    }
  }, [currentPage, pageSize, data?.projectDetails]);

  // Function to truncate text to a specific word count
  const truncateText = (text, wordCount) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= wordCount) return text;
    return words.slice(0, wordCount).join(' ') + '...';
  };

  // Handle opening modal with the selected item
  const handleSeeMore = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Handle closing modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // Handle page change
  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    if (size !== pageSize) {
      setPageSize(size);
    }
    // Scroll back to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeading text={'Project Photos'} />
      <h1 className="text-2xl font-bold mb-6">Project Images</h1>

      {totalItems > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedData.map((item, index) => (
              <Card
                key={`${currentPage}-${index}`}
                hoverable
                cover={
                  <img
                    alt={item.name}
                    src={item.image}
                    className="h-64 object-cover"
                  />
                }
                className="h-full flex flex-col"
              >
                <Meta
                  title={item.name}
                  description={
                    <div>
                      <p className="mb-2">
                        {truncateText(item.description, 10)}
                      </p>
                      <Button
                        type="link"
                        onClick={() => handleSeeMore(item)}
                        className="p-0 h-auto"
                      >
                        See More
                      </Button>
                    </div>
                  }
                />
              </Card>
            ))}
          </div>

          {/* Pagination control */}
          <div className="flex justify-center mt-8 mb-4">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalItems}
              onChange={handlePageChange}
              showSizeChanger={false}
              pageSizeOptions={['6', '9', '12', '24']}
              
            />
          </div>
        </>
      ) : (
        <Empty description="No project photos available" />
      )}

      {/* Modal for full description */}
      <Modal
        title={selectedItem?.name}
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            Close
          </Button>,
        ]}
        width={800}
      >
        {selectedItem && (
          <div className="flex flex-col gap-4">
            <div className="flex justify-center">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="max-w-full max-h-96 object-contain"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">
                {selectedItem.name}
              </h3>
              <p className="text-base whitespace-pre-line">
                {selectedItem.description}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ProjectPhotos;
