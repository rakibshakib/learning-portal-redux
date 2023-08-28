import { rootAPI } from "../apiSlice";

export const studentApi = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzesById: builder.query({
      query: (vidId) => `/quizzes?video_id=${vidId}`,
    }),
    getAssignmentById: builder.query({
      query: (vidId) => `/assignments?video_id=${vidId}`,
    }),
    checkAssignmentSubmittedByStudent: builder.query({
      query: ({ stuId, vidId }) =>
        `/assignmentMark?student_id=${stuId}&assignment_id=${vidId}`,
      providesTags: (result, error, arg) => [
        { type: "isSubmitted", stuId: arg?.stuId, vidId: arg?.vidId },
      ],
    }),
    addAssignment: builder.mutation({
      query: (data) => ({
        url: `/assignmentMark`,
        method: "POST",
        body: data,
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
                  draft.push(result?.data);
                }
              )
            );
            dispatch(
              rootAPI.util.updateQueryData(
                "checkAssignmentSubmittedByStudent",
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
      invalidatesTags: (result, error, arg) => [
        "isSubmitted",
        {
          type: "isSubmitted",
          stuId: arg?.student_id,
          vidId: arg?.assignment_id,
        },
      ],
    }),
    addQuizMark: builder.mutation({
      query: (data) => ({
        url: `/quizMark`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.id) {
            dispatch(
              rootAPI.util.updateQueryData(
                "getAllQuizeMark",
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
    getAllQuizeMark: builder.query({
      query: () => `/quizMark`,
    }),
    getAllQuizeMarkVideoId: builder.query({
      query: ({vidId, student_id}) => `/quizMark?video_id=${vidId}&student_id=${student_id}`,
    }),
  }),
});
export const {
  useGetQuizzesByIdQuery,
  useGetAssignmentByIdQuery,
  useAddAssignmentMutation,
  useCheckAssignmentSubmittedByStudentQuery,
  useAddQuizMarkMutation,
  useGetAllQuizeMarkQuery,
  useGetAllQuizeMarkVideoIdQuery
} = studentApi;
