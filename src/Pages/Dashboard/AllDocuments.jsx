import React, { useState } from 'react';
import { useProjectsDocumentQuery } from '../../Redux/services/pagesApisServices/doucmentApis';
import { Link, useLocation } from 'react-router';
import { MdOutlineDocumentScanner } from 'react-icons/md';
import { Card, Empty, Spin, Pagination } from 'antd';
import pdf from '../../assets/pdf.png';
import PageHeading from '../../Components/Shared/PageHeading';

function AllDocuments() {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedItems, setExpandedItems] = useState({}); // Track expanded state by document ID

  const { data: documentData, isLoading: documentDataLoading } =
    useProjectsDocumentQuery({
      id: location?.state,
      page: currentPage,
      limit: 9,
    });

  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  // Toggle description expansion for a specific document
  const toggleDescription = (documentId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [documentId]: !prev[documentId],
    }));
  };

  return (
    <div>
      <PageHeading text={'Project Details'} />
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
            <MdOutlineDocumentScanner className="inline-block mr-2" />
            Project Documents
          </h2>
        </div>

        {documentDataLoading ? (
          <div className="flex justify-center p-10">
            <Spin />
          </div>
        ) : (
          <div>
            {documentData?.data?.result?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documentData?.data?.result?.map((item) => (
                  <Card
                    key={item?._id}
                    className="overflow-hidden transition-all duration-300"
                  >
                    <div className="flex flex-col items-start">
                      <Link
                        target="_blank"
                        to={item?.document_url}
                        className="mb-3 hover:opacity-80 transition-opacity"
                      >
                        <img
                          preview={false}
                          className="!w-24 !h-24 object-contain"
                          src={pdf}
                          alt="PDF document"
                        />
                      </Link>
                      <h3 className="text-lg font-medium text-start text-gray-800 mb-1">
                        {item?.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {new Date(item?.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-sm text-gray-600 text-start">
                        {expandedItems[item?._id] ? (
                          <h1>{item?.description}</h1>
                        ) : (
                          <div className="flex gap-2">
                            <h1>{item?.description?.slice(0, 40)}...</h1>
                            <span
                              onClick={() => toggleDescription(item?._id)}
                              className="underline hover:text-blue-400 cursor-pointer"
                            >
                              see more
                            </span>
                          </div>
                        )}
                        {expandedItems[item?._id] && (
                          <span
                            onClick={() => toggleDescription(item?._id)}
                            className="underline hover:text-blue-400 cursor-pointer block mt-1"
                          >
                            see less
                          </span>
                        )}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="col-span-full">
                <Empty description="No project documents available" />
              </div>
            )}

            {/* Pagination Component */}
            <div className="flex justify-center mt-6">
              <Pagination
                current={currentPage}
                pageSize={10}
                total={documentData?.data?.meta?.total}
                onChange={handlePaginationChange}
                showSizeChanger={false}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllDocuments;
