import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchMyTasks, selectTasksIsPending } from "@/features/tasks/tasksSlice";
import { useEffect } from "react";
import Header from "./components/Header";
import TaskFilterSortProvider from "./TaskFilterSortProvider";
import TaskList from "./components/TaskList";

export default function Homepage() {
  const dispatch = useAppDispatch();
  const isPending = useAppSelector(selectTasksIsPending);

  useEffect(() => {
    dispatch(fetchMyTasks());
  }, [dispatch]);

  if (isPending) return null;

  return (
    <TaskFilterSortProvider>
      <div className="container mx-auto flex flex-col gap-2 px-1">
        <Header />
        <TaskList />
      </div>
    </TaskFilterSortProvider>
  );
}
