import { rootAPI } from "../apiSlice";

export const studentApi = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzesById: builder.query({
      query: (vidId) => `/quizzes?video_id=${+vidId}`,
    }),
  }),
});
export const { useGetQuizzesByIdQuery } = studentApi;
