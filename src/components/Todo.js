import React from "react";
import { useSelector } from "react-redux";
import { useGetTodosQuery } from "../features/api/apiSlice";
import TodoList from "./TodoList";

const Todo = () => {
  const { data: todos, isLoading, isError } = useGetTodosQuery();

  const { status, colors } = useSelector((state) => state.filter);

  const filterByStatus = (todo) => {
    switch (status) {
      case "all":
        return todo;
      case "incomplete":
        return !todo.completed;
      case "completed":
        return todo.completed;
      default:
        return todo;
    }
  };

  const filterByColor = (todo) => {
    if (colors.length === 0) {
      return todo;
    } else {
      return colors.includes(todo.color);
    }
  };

  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  }
  if (!isLoading && isError) {
    content = <div>Something went wrong...</div>;
  }
  if (!isLoading && !isError && todos.length === 0) {
    content = <div>No todos found...</div>;
  }
  if (!isLoading && !isError && todos.length > 0) {
    content = todos
      .filter(filterByStatus)
      .filter(filterByColor)
      .map((todo) => <TodoList key={todo.id} todo={todo} />);
  }

  return (
    <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
      {/* todo  */}
      {content}
    </div>
  );
};

export default Todo;
