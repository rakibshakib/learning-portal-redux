import { rootAPI } from "../apiSlice";

export const marksApi = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    getMarksLanding: builder.query({
      query: () => "/assignmentMark",
    }),
    editMarks: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: "PATCH",
        body: { id, ...data },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.id) {
            dispatch(
              rootAPI.util.updateQueryData(
                "getMarksLanding",
                undefined,
                (draft) => {
                  const updated = draft.map((a) => {
                    if (a?.id === result?.data?.id) {
                      return {
                        ...result?.data,
                        id: a?.id,
                      };
                    } else {
                      return a;
                    }
                  });
                  return updated;
                }
              )
            );
            dispatch(
              rootAPI.util.updateQueryData(
                "getQuizzessById",
                arg?.id.toString(),
                (draft) => {
                  return result?.data;
                }
              )
            );
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
});
export const { useGetMarksLandingQuery, useEditMarksMutation } = marksApi;
