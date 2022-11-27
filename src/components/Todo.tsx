import React from "react";
import { Categories, ITodo, todoState } from "../atoms";
import { useRecoilState } from "recoil";

const Todo = ({ text, category, id }: ITodo) => {
  const [todos,setTodos] = useRecoilState(todoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setTodos((oldTodos) => {
      const targetIndex = oldTodos.findIndex((todo) => todo.id === id);
      const newTodo = { text, id, category: name as any };

      return [
        ...oldTodos.slice(0, targetIndex),
        newTodo,
        ...oldTodos.slice(targetIndex + 1),
      ];
    }); 
  };
  const onRemove = () => {
    const newTodos = todos.filter((item) => item.id !== id)
    setTodos(newTodos)
  }

  console.log(todos)
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.Todo && (
        <button name={Categories.Todo} onClick={onClick}>
          Todo
        </button>
      )}
      {category !== Categories.Doing && (
        <button name={Categories.Doing} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.Done && (
        <button name={Categories.Done} onClick={onClick}>
          Done
        </button>
      )}
      <button onClick={onRemove}>X</button>
    </li>
  );
};

export default Todo;
