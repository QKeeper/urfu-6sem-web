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

export type TCategoryContext = {
  category: CATEGORY;
  sort: SORT;

  nextCategory: () => void;
  nextSort: () => void;
} | null;

export const CategoryContext = createContext<TCategoryContext>(null);

export function useCategory() {
  const ctx = useContext(CategoryContext);
  if (!ctx) throw new Error("Must be within CategoryContext");
  return ctx;
}
