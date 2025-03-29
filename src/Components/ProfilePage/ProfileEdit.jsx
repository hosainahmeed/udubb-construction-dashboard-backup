import { Button, Form, Input } from 'antd';
import React, { useEffect } from 'react';
import { useUpdateProfileDataMutation } from '../../Redux/services/profileApis';
import { toast } from 'react-hot-toast';

const ProfileEdit = ({ image, data }) => {
  const [form] = Form.useForm();
  const [setProfileUpdate, { isLoading: isProfileUpdate }] =
    useUpdateProfileDataMutation();

  const initialData = {
    name: data?.name || '',
    email: data?.email || '',
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue(initialData);
    }
  }, [data, form]);

  const onFinish = async (values) => {
    const updateData = {
      name: values.name,
      email: values.email,
      image,
    };

    const formData = new FormData();
    Object.keys(updateData).forEach((key) => {
      formData.append(key, updateData[key]);
    });

    if (image) {
      formData.append('profile_image', image);
    }

    try {
      const res = await setProfileUpdate(formData);
      if (res?.data?.success) {
        toast.success(res?.data?.message || 'Profile updated successfully!');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error(error?.data?.message || 'Failed to update profile');
    }
  };

  return (
    <div>
      <p className="text-[#213555] text-3xl text-center">Edit Profile</p>
      <Form
        className="text-white"
        requiredMark={false}
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={initialData}
      >
        <Form.Item name="name" label={<span className="text-black">Name</span>}>
          <Input
            placeholder="Name"
            className="p-2 w-full outline-none focus:bg-[var(--black-700)] hover:bg-[var(--black-700)] active:bg-[var(--black-700)] border-none h-11 text-[var(--white-600)]"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label={<span className="text-black">Email</span>}
        >
          <Input
            disabled
            type="email"
            placeholder="Email"
            className="cursor-not-allowed p-2 w-full outline-none focus:bg-[var(--black-700)] hover:bg-[var(--black-700)] active:bg-[var(--black-700)] border-none h-11 text-[var(--white-600)]"
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={isProfileUpdate}
          className="!bg-[#213555] !hover:bg-[#213555] active:bg-[#213555] w-full"
        >
          {isProfileUpdate ? 'Updating...' : 'Update Profile'}
        </Button>
      </Form>
    </div>
  );
};

export default ProfileEdit;
