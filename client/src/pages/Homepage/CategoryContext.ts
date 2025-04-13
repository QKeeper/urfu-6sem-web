import { createContext, Dispatch, SetStateAction, useContext } from "react";

export enum CATEGORY {
  ALL,
  COMPLETED,
  UNCOMPLETED,
}

export type THomepageContext = {
  selectedCategory: CATEGORY;
  setSelectedCategory: Dispatch<SetStateAction<CATEGORY>>;
} | null;

export const CategoryContext = createContext<THomepageContext>(null);

export function useCategory() {
  const ctx = useContext(CategoryContext);
  if (!ctx) throw new Error("Must be within CategoryContext");
  return ctx;
}
