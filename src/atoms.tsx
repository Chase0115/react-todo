import { atom, selector } from "recoil";

export enum Categories {
  "Todo" = "Todo",
  "Doing" = "Doing",
  "Done" = "Done",
}

export interface ITodo {
  id: number;
  text: string;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.Todo,
});

export const todoState = atom<ITodo[]>({
  key: "todo",
  default: localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos") as string) : []
});

export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const todos = get(todoState);
    const category = get(categoryState);
    return todos.filter((todo) => todo.category === category);
  },
});
