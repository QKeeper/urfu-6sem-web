import { ReactNode } from "react";
import { CategoryContext, THomepageContext } from "./CategoryContext";

export default function CategoryProvider({
  children,
  value = null,
}: {
  children?: ReactNode;
  value?: THomepageContext;
}) {
  return <CategoryContext.Provider value={value} children={children} />;
}
