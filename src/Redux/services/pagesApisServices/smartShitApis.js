import baseApis from '../../baseApis/baseApis';

export const smartShitApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllSmartShit: builder.query({
      query: () => ({
        url: '/get-sheet',
        method: 'GET',
      }),
      providesTags: ['smartShit'],
    }),
  }),
});

export const { useGetAllSmartShitQuery } = smartShitApis;
