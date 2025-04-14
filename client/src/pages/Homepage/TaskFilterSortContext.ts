import { createContext, useContext } from "react";

export enum CATEGORY {
  ALL,
  COMPLETED,
  UNCOMPLETED,
}

export enum SORT {
  NAME,
  CREATED,
}

export type TTaskFilterSortContext = {
  category: CATEGORY;
  sort: SORT;

  nextCategory: () => void;
  nextSort: () => void;
} | null;

export const TaskFilterSortContext = createContext<TTaskFilterSortContext>(null);

export function useTaskFilterSort() {
  const ctx = useContext(TaskFilterSortContext);
  if (!ctx) throw new Error("Must be within CategoryContext");
  return ctx;
}
