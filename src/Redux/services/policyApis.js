import baseApis from '../baseApis/baseApis';

export const policyApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getPolicy: builder.query({
      query: () => ({
        url: `/manage/get-privacy-policy`,
        method: 'GET',
      }),
      providesTags: ['policy'],
    }),
    updateSetting: builder.mutation({
      query: ({ data }) => ({
        url: '/manage/add-privacy-policy',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['policy'],
    }),
  }),
});

export const { useGetPolicyQuery, useUpdateSettingMutation } = policyApis;
