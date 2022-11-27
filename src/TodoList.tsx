import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { Categories, categoryState, todoSelector } from "./atoms";
import CreateTodo from "./components/CreateTodo";
import Todo from "./components/Todo";

const TodoList = () => {
  const todos = useRecoilValue(todoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  
  return (
    <div>
      <h1>Todo List</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.Todo}>To do</option>
        <option value={Categories.Doing}>Doing</option>
        <option value={Categories.Done}>Done</option>
      </select>
      <CreateTodo />
      {todos?.map((item) => (
        <Todo key={item.id} {...item}></Todo>
      ))}
    </div>
  );
};

export default TodoList;
