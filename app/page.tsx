"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import Destructuring from "./destructuring/page";
import { todo } from "node:test";

type TodoType = {
  id: string;
  todo: string;
  done: boolean;
  size?: number;
};

export default function Home(text: string) {
  const [input, setInput] = useState<string>("");

  const [todos, setTodos] = useState<TodoType[]>(() => {
    const savedTodos = window.localStorage.getItem("myTodos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const addButtonHandle = () => {
    const addTodo = [
      ...todos,
      { id: String(new Date()), todo: input, done: false },
    ];
    window.localStorage.setItem("myTodos", JSON.stringify(addTodo));
    setTodos(addTodo);
    setInput("");
  };

  const deleteHandle = (e: any, param: string) => {
    console.log(param);
    const filtered = todos.filter((todo) => todo.id !== param);

    window.localStorage.setItem("myTodos", JSON.stringify(filtered));

    setTodos(filtered);
  };

  const doneHandle = (e: any, param: string) => {
    const editTodos = todos.map((todo) =>
      todo.id === param ? { ...todo, done: !todo.done } : { ...todo }
    );
    setTodos(editTodos);
    window.localStorage.setItem("myTodos", JSON.stringify(editTodos));
  };

  useEffect(() => {
    console.log("todos", ...todos);
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* <Destructuring array={[1,2,3,4,5,6,7,8,9,10]}/> */}
      <div className="title text-[5rem] font-extrabold mt-32">Todo</div>
      <div className="border-red-500">
        <input
          type="text"
          value={input}
          placeholder="여기에 입력하세요"
          className="text-black text-3xl p-2"
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <button
        className="border bg-white text-black m-2 p-2 rounded-lg"
        onClick={addButtonHandle}
      >
        할일 추가
      </button>
      <div className="text-[2rem]">
        {todos?.map((item, index) => {
          return (
            <div key={index} className="relative">
              <div
                onClick={(e) => doneHandle(e, item.id)}
                className={`border w-[25rem] m-4 p-2 cursor-pointer ${
                  item.size && "text-[1rem]"
                } ${!item.done && "text-red-400"}`}
              >
                {item.todo}
              </div>
              <FaDeleteLeft
                onClick={(e) => {
                  deleteHandle(e, item.id);
                }}
                className="absolute right-8 top-4"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

const todos: string[] = ["동해물과", "백두산이"];

const ex = { todos: ["동해물과", "백두산이"] };

function addText(글자: string) {
  console.log("클릭");
  todos.push(글자);
}
