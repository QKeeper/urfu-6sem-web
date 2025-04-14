import { ReactNode, useCallback, useState } from "react";
import { CATEGORY, CategoryContext, SORT } from "./CategoryContext";

export default function CategoryProvider({ children }: { children?: ReactNode }) {
  const [category, setCategory] = useState<CATEGORY>(CATEGORY.ALL);
  const [sort, setSort] = useState<SORT>(SORT.CREATED);

  const nextCategory = useCallback(() => {
    setCategory((p) => {
      return p === Object.keys(CATEGORY).length / 2 - 1 ? 0 : p + 1;
    });
  }, []);

  const nextSort = useCallback(() => {
    setSort((p) => {
      return p === Object.keys(SORT).length / 2 - 1 ? 0 : p + 1;
    });
  }, []);

  const defaultValue = { category, nextCategory, sort, nextSort };

  return <CategoryContext.Provider value={defaultValue} children={children} />;
}
