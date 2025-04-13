import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchMyTasks, selectTasksIsPending, selectTasks } from "@/features/tasks/tasksSlice";
import { useEffect, useMemo, useState } from "react";
import Task from "./components/Task";
import Header from "./components/Header";
import CategoryProvider from "./CategoryProvider";
import { CATEGORY } from "./CategoryContext";

export default function Homepage() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);
  const isPending = useAppSelector(selectTasksIsPending);

  const [category, setCategory] = useState<CATEGORY>(CATEGORY.ALL);

  const filteredTasks = useMemo(() => {
    if (category === CATEGORY.ALL) return tasks;
    else return tasks.filter((task) => task.completed == (category == CATEGORY.COMPLETED));
  }, [category, tasks]);

  useEffect(() => {
    dispatch(fetchMyTasks());
  }, [dispatch]);

  if (isPending) return null;

  return (
    <CategoryProvider value={{ selectedCategory: category, setSelectedCategory: setCategory }}>
      <div className="container mx-auto flex flex-col gap-2 px-1">
        <Header />

        <div className="flex flex-col">
          {filteredTasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      </div>
    </CategoryProvider>
  );
}
