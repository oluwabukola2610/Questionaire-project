import {
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers) => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      headers.set("Token", authToken);
    }
    headers.set("Accept", "application/json");
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result: any = await baseQuery(args, api, extraOptions);
  if (result?.error?.originalStatus || result?.error?.status === 401) {
    console.log(result);
  }
  return result;
};

export const ApiSlice = createApi({
  reducerPath: "api",
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
