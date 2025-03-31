// import { Button, Card, Col, Form, Image, Row, Typography } from 'antd';
// import React from 'react';
// import { imageUrl } from '../../Utils/server';
// const { Title, Text } = Typography;

// function OfficeManagerAssignComponent({
//   setOfficeManagerModal,
//   officeManager,
// }) {

//   return (
//     <div>
//       <Card className="!mt-2">
//         <Row gutter={24} className="mt-4 items-center">
//           <Col span={18}>
//             <Form.Item
//               label={
//                 <Title level={5} className="text-gray-700 mb-1">
//                   Office Manager
//                 </Title>
//               }
//             >
//               <Text className="text-gray-600">
//                 Please Select Office Manager
//               </Text>
//             </Form.Item>
//           </Col>

//           <Col span={4}>
//             {officeManager ? (
//               <Button
//                 onClick={() => setOfficeManagerModal(true)}
//                 className={`!bg-[#213555] !text-white w-fit px-2 py-1 rounded`}
//               >
//                 Change
//               </Button>
//             ) : (
//               <Button
//                 onClick={() => setOfficeManagerModal(true)}
//                 className={`!bg-[#213555] !text-white w-fit px-2 py-1 rounded`}
//               >
//                 Assign
//               </Button>
//             )}
//           </Col>
//         </Row>
//         {officeManager && (
//           <Row gutter={24} className="mt-4 items-center">
//             <div className="flex items-start gap-2">
//               <Image
//                 src={imageUrl(officeManager?.profile_image)}
//                 className="!w-16 !h-12 object-cover rounded-md overflow-hidden"
//                 alt={officeManager?.name}
//               />
//               <div>
//                 <p className="text-base leading-none">{officeManager?.name}</p>
//                 <p className="text-[#808080] leading-none text-sm">
//                   {officeManager?.email}
//                 </p>
//               </div>
//             </div>
//           </Row>
//         )}
//       </Card>
//     </div>
//   );
// }

// export default OfficeManagerAssignComponent;
import { Button, Card, Col, Form, Image, Row, Typography } from 'antd';
import React from 'react';
import { imageUrl } from '../../Utils/server';
import { useGetAllUserQuery } from '../../Redux/services/pagesApisServices/userApis';
import { MdDelete } from 'react-icons/md';
import toast from 'react-hot-toast';
const { Title, Text } = Typography;
function OfficeManagerAssignComponent({
  setOfficeManagerModal,
  officeManager,
}) {
  const {
    data: OwnerData,
    isLoading,
    refetch,
  } = useGetAllUserQuery({
    role: 'officeManager',
  });
  const id = localStorage.getItem('officeManager');
  const filterData = OwnerData?.data?.result?.filter(
    (item) => item?._id === id
  );
  const Assign = id ? 'Change' : 'Assign';

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
            {officeManager ? (
              <Button
                onClick={() => setOfficeManagerModal(true)}
                className={`!bg-[#213555] !text-white w-fit px-2 py-1 rounded`}
              >
                Change
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={() => setOfficeManagerModal(true)}
                  className={`${
                    id && '!bg-[#213555] !text-white'
                  }  w-fit px-2 py-1 rounded`}
                >
                  {Assign}
                </Button>
                {id && (
                  <Button
                    shape="circle"
                    onClick={() => {
                      localStorage.removeItem('officeManager');
                      toast.success('Office Manager removed!');
                      refetch();
                    }}
                    className={`!bg-red-500 !text-white w-fit px-2 py-1 rounded`}
                  >
                    <MdDelete />
                  </Button>
                )}
              </div>
            )}
          </Col>
        </Row>
        {officeManager && (
          <Row gutter={24} className="mt-4 items-center">
            <div className="flex items-start gap-2">
              <Image
                src={imageUrl(officeManager?.profile_image)}
                className="!w-16 !h-12 object-cover rounded-md overflow-hidden"
                alt={officeManager?.name}
              />
              <div>
                <p className="text-base leading-none">{officeManager?.name}</p>
                <p className="text-[#808080] leading-none text-sm">
                  {officeManager?.email}
                </p>
              </div>
            </div>
          </Row>
        )}
        {filterData?.length > 0 && !officeManager && (
          <Row gutter={24} className="mt-4 items-center">
            <div className="flex items-start gap-2">
              <Image
                src={imageUrl(filterData[0]?.profile_image)}
                className="!w-16 !h-12 object-cover rounded-md overflow-hidden"
                alt={filterData[0]?.name}
              />
              <div>
                <p className="text-base leading-none">{filterData[0]?.name}</p>
                <p className="text-[#808080] leading-none text-sm">
                  {filterData[0]?.email}
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
