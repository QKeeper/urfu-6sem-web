import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { createTask, fetchMyTasks, selectTasksIsPending, selectTasks } from "@/features/tasks/tasksSlice";
import { useEffect } from "react";
import Task from "./components/Task";
import { PlusIcon } from "lucide-react";

export default function Homepage() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);
  const isPending = useAppSelector(selectTasksIsPending);

  useEffect(() => {
    dispatch(fetchMyTasks());
  }, [dispatch]);

  const createTaskHandler = () => dispatch(createTask({ title: "Untitled task" }));

  if (isPending) return null;

  return (
    <div className="container mx-auto flex flex-col gap-2 px-1">
      <p className="mt-2 flex items-center gap-1">
        {tasks.length} Tasks{" "}
        <button
          onClick={createTaskHandler}
          className="flex cursor-pointer items-center gap-1 rounded bg-gray-100 p-1 pr-2 text-sm hover:bg-gray-200"
        >
          <PlusIcon className="size-4" /> Add
        </button>
      </p>

      <div className="flex flex-col">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
