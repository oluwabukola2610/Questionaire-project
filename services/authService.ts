import { ApiSlice } from "./Api";

const authSlice = ApiSlice.enhanceEndpoints({
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
    }),
    deleteQuestion: builder.mutation({
      query: (questionId) => ({
        url: `questions/${questionId}`,
        method: "DELETE",
      }),
      
    }),

    updateQuestion: builder.mutation({
      query: ({ question, questionId }) => ({
        url: `questions/${questionId}`,
        method: "PUT",
        body: { question, questionId },
      }),
    }),  
    getQuestions: builder.query({
      query: () => ({ url: "questions", method: "GET" }),
    }),
  }),
});

export const {
  useRegisterTokenMutation,
  useGetQuestionsQuery,
  useCreateQuestionAndOptionsMutation,
  useDeleteQuestionMutation, 
  useUpdateQuestionMutation
} = authSlice;
