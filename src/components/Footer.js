import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetTodosQuery } from "../features/api/apiSlice";
import {
  filterByColor,
  filterStatus,
} from "../features/filterSlice/filterSlice";

const Footer = () => {
  const dispatch = useDispatch();
  const { status, colors } = useSelector((state) => state.filter);
  // const { data: todos } = useSelector((state) => state.api);
  const { data: todos } = useGetTodosQuery();

  const handleChangeStatus = (status) => {
    dispatch(filterStatus(status));
  };

  const handleColorChange = (colors) => {
    dispatch(filterByColor(colors));
  };

  const remainingTodos = todos?.filter((todo) => !todo.completed).length;

  return (
    <div className="mt-4 flex justify-between text-xs text-gray-500">
      <p>{remainingTodos} tasks left</p>
      <ul className="flex space-x-1 items-center text-xs">
        <li
          className={`cursor-pointer ${status === "all" && "font-bold"}`}
          onClick={() => handleChangeStatus("all")}
        >
          All
        </li>
        <li>|</li>
        <li
          className={`cursor-pointer ${status === "incomplete" && "font-bold"}`}
          onClick={() => handleChangeStatus("incomplete")}
        >
          Incomplete
        </li>
        <li>|</li>
        <li
          className={`cursor-pointer ${status === "completed" && "font-bold"}`}
          onClick={() => handleChangeStatus("completed")}
        >
          Complete
        </li>
        <li></li>
        <li></li>
        <li
          className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${
            colors.includes("green") && "bg-green-500"
          }`}
          onClick={() => handleColorChange("green")}
        ></li>
        <li
          className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${
            colors.includes("red") && "bg-red-500"
          }`}
          onClick={() => handleColorChange("red")}
        ></li>
        <li
          className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer ${
            colors.includes("yellow") && "bg-yellow-500"
          }`}
          onClick={() => handleColorChange("yellow")}
        ></li>
      </ul>
    </div>
  );
};

export default Footer;
