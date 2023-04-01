import { rootAPI } from "../apiSlice";

export const assignmentsApi = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query({
      query: () => "/assignments",
    }),
    getassignmentsById: builder.query({
      query: (id) => `/assignments/${id}`,
    }),
    addAssignments: builder.mutation({
      query: (data) => ({
        url: "/assignments",
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
                "getAssignments",
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
    editAssignmentsById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignments/${id}`,
        method: "PATCH",
        body: { id, ...data },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.id) {
            dispatch(
              rootAPI.util.updateQueryData(
                "getAssignments",
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
                "getassignmentsById",
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
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const action = dispatch(
          rootAPI.util.updateQueryData("getAssignments", undefined, (draft) => {
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
  useGetAssignmentsQuery,
  useGetassignmentsByIdQuery,
  useAddAssignmentsMutation,
  useEditAssignmentsByIdMutation,
  useDeleteAssignmentMutation,
} = assignmentsApi;
