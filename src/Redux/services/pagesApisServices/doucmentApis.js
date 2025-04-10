import baseApis from '../../baseApis/baseApis';

export const doucmentApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    projectsDocument: builder.query({
      query: ({ id, limit, page }) => ({
        url: `/project-document/get-project-documents/${id}`,
        method: 'GET',
        params: { limit, page },
      }),
      providesTags: ['project'],
    }),
  }),
});

export const { useProjectsDocumentQuery } = doucmentApis;
