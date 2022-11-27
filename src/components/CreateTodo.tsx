import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, todoState } from "../atoms";

interface IForm {
  todo: string;
}

const CreateTodo = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  const [todos, setTodos] = useRecoilState(todoState);
  const category = useRecoilValue(categoryState);
  const onSubmit = ({ todo }: IForm) => {
    setTodos((oldTodos) => [
      { text: todo, id: Date.now(), category },
      ...oldTodos,
    ]);
    setValue("todo", "");
  };

  useEffect(() => {
    return localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("todo", {
          required: "To do is requried",
        })}
        placeholder='Write to do'
      />
      <p>{errors?.todo?.message}</p>
      <button>Submit</button>
    </form>
  );
};
export default CreateTodo;
