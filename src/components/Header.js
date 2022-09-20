import React from "react";
import plusIcon from "../assets/images/plus.png";
import noteIcon from "../assets/images/notes.png";
import tickIcon from "../assets/images/double-tick.png";
import {
  useAddTodoMutation,
  useClearCompletedMutation,
  useCompletedAllMutation,
  useGetTodosQuery,
} from "../features/api/apiSlice";

const Header = () => {
  const [inputText, setInputText] = React.useState("");
  const [addTodo, { isLoading, isSuccess }] = useAddTodoMutation();
  const [completedAll] = useCompletedAllMutation();
  const { data: todos } = useGetTodosQuery();
  const [clearCompleted] = useClearCompletedMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({
      text: inputText,
      completed: false,
    });
    resetForm();
  };
  const resetForm = () => {
    setInputText("");
  };
  const handleCompletedAll = () => {
    todos.forEach((todo) => {
      completedAll(todo);
    });
  };
  const handleClearCompleted = () => {
    todos.forEach((todo) => {
      if (todo.completed) {
        clearCompleted(todo);
      }
    });
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
      >
        <img src={noteIcon} className="w-6 h-6" alt="Add todo" />
        <input
          type="text"
          placeholder="Type your todo"
          className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          disabled={isLoading}
          type="submit"
          className={`appearance-none w-8 h-8 bg-[url(${plusIcon})] bg-no-repeat bg-contain`}
        ></button>
      </form>
      {isSuccess && <p className="text-center">Successfully added Todo</p>}
      <ul className="flex justify-between my-4 text-xs text-gray-500">
        <li
          className="flex space-x-1 cursor-pointer"
          onClick={handleCompletedAll}
        >
          <img className="w-4 h-4" src={tickIcon} alt="Complete" />
          <span>Complete All Tasks</span>
        </li>
        <li className="cursor-pointer" onClick={handleClearCompleted}>
          Clear completed
        </li>
      </ul>
    </div>
  );
};

export default Header;
