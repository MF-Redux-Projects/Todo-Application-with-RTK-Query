import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://todo-server-orl9.onrender.com",
  }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => `/todos`,

      providesTags: ["Todos"],
    }),
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: "/todos",
        method: "POST",
        body: newTodo,
      }),
      invalidatesTags: ["Todos"],
    }),
    updateStatus: builder.mutation({
      query: ({ id, currentStatus }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: { completed: !currentStatus },
      }),
      invalidatesTags: ["Todos"],
    }),
    updateColor: builder.mutation({
      query: ({ id, currentColor }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: { color: currentColor },
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
    completedAll: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH",
        body: { completed: true },
      }),
      invalidatesTags: ["Todos"],
    }),
    clearCompleted: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateStatusMutation,
  useUpdateColorMutation,
  useDeleteTodoMutation,
  useCompletedAllMutation,
  useClearCompletedMutation,
} = apiSlice;
