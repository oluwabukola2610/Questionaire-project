import { ApiSlice } from "./Api";

const authSlice = ApiSlice.enhanceEndpoints({
  addTagTypes: ["questions" as const],
}).injectEndpoints({
  endpoints: (builder) => ({
    registerToken: builder.mutation({
      query: (body) => ({
        url: "token",
        method: "POST",
        body,
      }),
      onQueryStarted(id, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then((apiResponse) => {
            localStorage.setItem("authToken", apiResponse.data?.token);
          })
          .catch(() => {});
      },
    }),
    createQuestionAndOptions: builder.mutation({
      query: ({ question, options }) => ({
        url: "questions",
        method: "POST",
        body: { question, options },
      }),
      invalidatesTags: ["questions"],
    }),
    deleteQuestion: builder.mutation({
      query: (questionId) => ({
        url: `questions/${questionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["questions"],
    }),

    updateQuestion: builder.mutation({
      query: ({ question, questionId, options }) => ({
        url: `questions/${questionId}`,
        method: "PUT",
        body: { question, options },
      }),
      invalidatesTags: ["questions"],
    }),
    getQuestions: builder.query({
      query: () => ({ url: "questions", method: "GET" }),
      providesTags: ["questions"],
    }),
  }),
});

export const {
  useRegisterTokenMutation,
  useGetQuestionsQuery,
  useCreateQuestionAndOptionsMutation,
  useDeleteQuestionMutation,
  useUpdateQuestionMutation,
} = authSlice;
