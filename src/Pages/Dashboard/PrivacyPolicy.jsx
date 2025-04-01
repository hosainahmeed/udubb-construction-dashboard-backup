import React, { useEffect, useState } from 'react';
import { Button, notification } from 'antd';
import PageHeading from '../../Components/Shared/PageHeading.jsx';
import JoditComponent from '../../Components/Shared/JoditComponent.jsx';
import {
  useGetPolicyQuery,
  useUpdateSettingMutation,
} from '../../Redux/services/policyApis.js';
import { usePostTermsConditionsMutation } from '../../Redux/services/termsConditionsApis.js';
import toast from 'react-hot-toast';

const PrivacyPolicy = () => {
  const [content, setContent] = useState('');
  const { data, isLoading } = useGetPolicyQuery({});
  const [setDescription] = useUpdateSettingMutation();

  useEffect(() => {
    if (data?.data?.description) {
      setContent(data?.data?.description);
    }
  }, [data]);

  const handleLogContent = async () => {
    try {
      const data = {
        description: content,
      };
      const res = await setDescription({ data }).unwrap();

      if (res?.success) {
        toast.success(
          res?.message || 'Terms & Conditions updated successfully!'
        );
      }
    } catch (error) {
      toast.error(error?.message || 'Failed to update Terms & Conditions.');
    }
  };

  if (isLoading) {
    return <p>..loading</p>;
  }

  return (
    <>
      {/* heading and back button */}
      <PageHeading text="Privacy Policy" />
      <JoditComponent setContent={setContent} content={content} />

      {/* Button to log content */}
      <Button
        onClick={handleLogContent}
        // disabled={isSubmitting}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '10px',
        }}
        className="max-w-48 sidebar-button-black"
      >
        {/* {isSubmitting ? 'Submitting...' : 'Submit'} */}
        Submit
      </Button>
    </>
  );
};

export default PrivacyPolicy;
