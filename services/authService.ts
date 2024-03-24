import { ApiSlice } from "./Api";

const authSlice = ApiSlice.enhanceEndpoints({}).injectEndpoints({
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
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const { data: getQuestions } = await queryFulfilled;
          const patchResult = dispatch(
            authSlice.util.upsertQueryData("getQuestions", id, getQuestions)
          );
        } catch {}
      },
    }),
    deleteQuestion: builder.mutation({
      query: (questionId) => ({
        url: `questions/${questionId}`,
        method: "DELETE",
      }),
      onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          authSlice.util.updateQueryData("getQuestions", id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),

    updateQuestion: builder.mutation({
      query: ({ question, questionId }) => ({
        url: `questions/${questionId}`,
        method: "PUT",
        body: { question, questionId },
      }),
      onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          authSlice.util.updateQueryData("getQuestions", id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        queryFulfilled.catch(patchResult.undo);
      },
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
  useUpdateQuestionMutation,
} = authSlice;
