import { Button, Card, Col, Form, Image, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { imageUrl } from '../../Utils/server';
import { useGetAllUserQuery } from '../../Redux/services/pagesApisServices/userApis';
import { MdDelete } from 'react-icons/md';
import toast from 'react-hot-toast';
const { Title, Text } = Typography;

function OfficeManagerAssignComponent({
  setOfficeManagerModal,
  officeManager,
}) {

  const [selectedOfficeManager, setSelectedOfficeManager] = useState(null);
  const {
    data: OwnerData,
    isLoading,
    refetch,
  } = useGetAllUserQuery({
    role: 'officeManager',
    limit: 999,
  });

  const id = localStorage.getItem('officeManager');
  
  useEffect(() => {
    if (officeManager) {
      setSelectedOfficeManager(officeManager);
    }
  }, [officeManager]);

  useEffect(() => {
    if (id && OwnerData?.data?.result) {
      const filterData = OwnerData.data.result.filter(
        (item) => item._id === id
      );
      if (filterData.length > 0) {
        setSelectedOfficeManager(filterData[0]);
      }
    }
  }, [id, OwnerData]);

  const Assign = selectedOfficeManager ? 'Change' : 'Assign';

  return (
    <div className="mt-2">
      <Card>
        <Row gutter={24} className="!mt-4 items-center">
          <Col span={18}>
            <Form.Item
              label={
                <Title level={5} className="text-gray-700 mb-1">
                  Office Manager
                </Title>
              }
            >
              <Text className="text-gray-600">
                Please Select Office Manager
              </Text>
            </Form.Item>
          </Col>

          <Col span={4}>
            <div className="flex gap-2">
              <Button
                onClick={() => setOfficeManagerModal(true)}
                className={`${
                  selectedOfficeManager ? '!bg-[#213555] !text-white' : ''
                } w-fit px-2 py-1 rounded`}
              >
                {Assign}
              </Button>
              {selectedOfficeManager && (
                <Button
                  shape="circle"
                  onClick={() => {
                    localStorage.removeItem('officeManager');
                    setSelectedOfficeManager(null);
                    toast.success('Office Manager removed!');
                    refetch();
                  }}
                  className="!bg-red-500 !text-white w-fit px-2 py-1 rounded"
                >
                  <MdDelete />
                </Button>
              )}
            </div>
          </Col>
        </Row>

        {selectedOfficeManager && (
          <Row gutter={24} className="mt-4 items-center">
            <div className="flex items-start gap-2">
              <Image
                src={imageUrl(selectedOfficeManager?.profile_image)}
                className="!w-16 !h-12 object-cover rounded-md overflow-hidden"
                alt={selectedOfficeManager?.name}
                fallback="https://i.ibb.co.com/PsxKbMWH/defult-Image.jpg"
              />
              <div>
                <p className="text-base leading-none">
                  {selectedOfficeManager?.name}
                </p>
                <p className="text-[#808080] leading-none text-sm">
                  {selectedOfficeManager?.email}
                </p>
              </div>
            </div>
          </Row>
        )}
      </Card>
    </div>
  );
}

export default OfficeManagerAssignComponent;
