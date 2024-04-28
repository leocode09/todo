"use client"
import { useState, useEffect } from 'react';
import RemoveTodo from "./RemoveTodo";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

const getTodos = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/todos", { cache: "no-store" });
    if (!res.ok) throw new Error("failed to fetch");
    return res.json();
  } catch (error) {
    console.log('error', error);
  }
};

export default function TodosList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const todosData = await getTodos();
      setTodos(todosData);
    };
    fetchTodos();
  }, []);

  return (
    <>
      {todos.length > 0 ? (
        todos.map((todo) => (
          <div key={todo._id} className="todo">
            <div className="todoTexts">
              <h2>{todo.title}</h2>
              <p>{todo.description}</p>
            </div>
            <div className="todoButtons">
              <RemoveTodo id={todo._id} />
              <Link href={`/editTodo/${todo._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>Loading todos...</p>
      )}
    </>
  );
}