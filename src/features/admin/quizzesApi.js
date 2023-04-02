import { rootAPI } from "../apiSlice";

export const quizzesApi = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzess: builder.query({
      query: () => "/quizzes",
    }),
    getQuizzessById: builder.query({
      query: (id) => `/quizzes/${id}`,
    }),
    addQuizzess: builder.mutation({
      query: (data) => ({
        url: "/quizzes",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result);
          if (result?.data?.id) {
            dispatch(
              rootAPI.util.updateQueryData(
                "getQuizzess",
                undefined,
                (draft) => {
                  draft.push(result?.data);
                }
              )
            );
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
    editQuizzessById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: "PATCH",
        body: { id, ...data },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.id) {
            dispatch(
              rootAPI.util.updateQueryData(
                "getQuizzess",
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
    deleteQuizzes: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const action = dispatch(
          rootAPI.util.updateQueryData("getQuizzess", undefined, (draft) => {
            const remaining = draft.filter((a) => a?.id !== arg);
            return remaining;
          })
        );
        try {
          const result = await queryFulfilled;
        } catch (err) {
          action.undo();
        }
      },
    }),
  }),
});
export const {
  useAddQuizzessMutation,
  useDeleteQuizzesMutation,
  useEditQuizzessByIdMutation,
  useGetQuizzessByIdQuery,
  useGetQuizzessQuery,
} = quizzesApi;
