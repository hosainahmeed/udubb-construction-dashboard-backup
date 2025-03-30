import React, { useEffect, useState } from 'react';
import { Button, notification } from 'antd';
import JoditComponent from '../../Components/Shared/JoditComponent.jsx';
import PageHeading from '../../Components/Shared/PageHeading.jsx';
import {
  useGetTermsConditionsQuery,
  usePostTermsConditionsMutation,
} from '../../Redux/services/termsConditionsApis.js';
import toast from 'react-hot-toast';
useGetTermsConditionsQuery;
const TermsCondition = () => {
  const [content, setContent] = useState('');
  const { data, isLoading } = useGetTermsConditionsQuery({});
  const [setDescription, { isLoading: isSubmitting }] =
    usePostTermsConditionsMutation();

  useEffect(() => {
    if (data?.data?.description) {
      setContent(data?.data?.description);
    }
  }, [data]);

  const handleLogContent = async () => {
    try {
      await setDescription({ description: content }).unwrap();
      toast.success('Terms & Conditions updated successfully!');
    } catch (error) {
      toast.error('Failed to update Terms & Conditions. Please try again.');
    }
  };

  if (isLoading) {
    return <p>..loading</p>;
  }

  return (
    <>
      {/* heading and back button */}
      <PageHeading text="Terms & Condition" />
      <JoditComponent setContent={setContent} content={content} />

      {/* Button to log content */}
      <Button
        onClick={handleLogContent}
        disabled={isSubmitting}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '10px',
        }}
        className="max-w-48 sidebar-button-black"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </>
  );
};

export default TermsCondition;
