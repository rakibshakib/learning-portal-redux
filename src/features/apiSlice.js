import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rootAPI = createApi({
  reducerPath: "rootAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  tagTypes: ["isSubmitted"],
  endpoints: (builder) => ({}),
});


