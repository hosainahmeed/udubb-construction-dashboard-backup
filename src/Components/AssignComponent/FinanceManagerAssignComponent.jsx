import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Form, Image, Row, Typography } from 'antd';
import { imageUrl } from '../../Utils/server';
import { useGetAllUserQuery } from '../../Redux/services/pagesApisServices/userApis';
import { MdDelete } from 'react-icons/md';
import toast from 'react-hot-toast';
const { Title, Text } = Typography;

function FinanceManagerAssignComponent({
  setFinanceManagerModal,
  financeManager,
}) {
  const [selectedFinanceManager, setSelectedFinanceManager] = useState(null);

  const {
    data: OwnerData,
    isLoading,
    refetch,
  } = useGetAllUserQuery({
    role: 'financeManager',
    limit: 999,
  });

  const id = localStorage.getItem('financeManager');

  useEffect(() => {
    if (financeManager) {
      setSelectedFinanceManager(financeManager);
    }
  }, [financeManager]);

  useEffect(() => {
    if (id && OwnerData?.data?.result) {
      const filterData = OwnerData.data.result.filter(
        (item) => item._id === id
      );
      if (filterData.length > 0) {
        setSelectedFinanceManager(filterData[0]);
      }
    }
  }, [id, OwnerData]);

  const Assign = selectedFinanceManager ? 'Change' : 'Assign';

  return (
    <div className="mt-2">
      <Card>
        <Row gutter={24} className="!mt-4 items-center">
          <Col span={18}>
            <Form.Item
              label={
                <Title level={5} className="text-gray-700 mb-1">
                  Finance Manager
                </Title>
              }
            >
              <Text className="text-gray-600">
                Please Select Finance Manager
              </Text>
            </Form.Item>
          </Col>

          <Col span={4}>
            <div className="flex gap-2">
              <Button
                onClick={() => setFinanceManagerModal(true)}
                className={`${
                  selectedFinanceManager ? '!bg-[#213555] !text-white' : ''
                } w-fit px-2 py-1 rounded`}
              >
                {Assign}
              </Button>
              {selectedFinanceManager && (
                <Button
                  shape="circle"
                  onClick={() => {
                    localStorage.removeItem('financeManager');
                    setSelectedFinanceManager(null);
                    toast.success('Finance manager removed!');
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

        {selectedFinanceManager && (
          <Row gutter={24} className="mt-4 items-center">
            <div className="flex items-start gap-2">
              <Image
                src={imageUrl(selectedFinanceManager?.profile_image)}
                className="!w-16 !h-12 object-cover rounded-md overflow-hidden"
                alt={selectedFinanceManager?.name}
                fallback="https://i.ibb.co.com/PsxKbMWH/defult-Image.jpg"
              />
              <div>
                <p className="text-base leading-none">
                  {selectedFinanceManager?.name}
                </p>
                <p className="text-[#808080] leading-none text-sm">
                  {selectedFinanceManager?.email}
                </p>
              </div>
            </div>
          </Row>
        )}
      </Card>
    </div>
  );
}

export default FinanceManagerAssignComponent;
