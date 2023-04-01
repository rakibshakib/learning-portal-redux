import { rootAPI } from "../apiSlice";

export const adminApi = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
    }),
    getVideosById: builder.query({
      query: (id) => `/videos/${id}`,
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.id) {
            dispatch(
              rootAPI.util.updateQueryData("getVideos", undefined, (draft) => {
                draft.push(result?.data);
              })
            );
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
    editVideoById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: { id, ...data },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.id) {
            dispatch(
              rootAPI.util.updateQueryData("getVideos", undefined, (draft) => {
                const updated = draft.map((video) => {
                  if (video?.id === result?.data?.id) {
                    return {
                      ...result?.data,
                      id: video?.id,
                    };
                  } else {
                    return video;
                  }
                });
                return updated;
              })
            );
            dispatch(
              rootAPI.util.updateQueryData(
                "getVideosById",
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
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const deleteVideo = dispatch(
          rootAPI.util.updateQueryData("getVideos", undefined, (draft) => {
            const remainingVideo = draft.filter((t) => t?.id !== arg);
            return remainingVideo;
          })
        );
        try {
          const result = await queryFulfilled;
        } catch (err) {
          deleteVideo.undo();
        }
      },
    }),
  }),
});

export const {
  useGetVideosQuery,
  useAddVideoMutation,
  useDeleteVideoMutation,
  useGetVideosByIdQuery,
  useEditVideoByIdMutation,
} = adminApi;
