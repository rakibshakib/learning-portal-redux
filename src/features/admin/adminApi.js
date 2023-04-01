import { rootAPI } from "../apiSlice";

export const adminApi = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result);
        } catch (err) {
          // do nothing
        }
      },
    }),
    getVideos: builder.query({
      query: () => "/videos",
    }),
  }),
});

export const { useGetVideosQuery } = adminApi;
