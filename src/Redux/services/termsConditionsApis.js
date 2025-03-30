import baseApis from '../baseApis/baseApis';

const termsConditionsApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getTermsConditions: builder.query({
      query: () => ({
        url: '/manage/get-terms-conditions',
        method: 'GET',
      }),
    }),
    postTermsConditions: builder.mutation({
      query: ({ data }) => ({
        url: '/manage/add-terms-conditions',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetTermsConditionsQuery, usePostTermsConditionsMutation } =
  termsConditionsApis;
