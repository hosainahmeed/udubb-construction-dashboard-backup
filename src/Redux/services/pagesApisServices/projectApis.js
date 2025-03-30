import baseApis from '../../baseApis/baseApis';

export const projectApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: ({ searchTerm, page }) => ({
        url: `/project/get-all-project`,
        method: 'GET',
        params: { searchTerm, page },
      }),
      providesTags: ['project'],
    }),
    getSingleProject: builder.query({
      query: ({ id }) => ({
        url: `/project/get-single-project/${id}`,
        method: 'GET',
      }),
      providesTags: ['project'],
    }),
    createProjects: builder.mutation({
      query: (data) => ({
        url: '/project/create-project',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['project'],
    }),
    
  }),
});

export const {
  useGetAllProjectsQuery,
  useGetSingleProjectQuery,
  useCreateProjectsMutation,
} = projectApis;
