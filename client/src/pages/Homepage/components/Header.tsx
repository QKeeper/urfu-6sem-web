import { useAppDispatch } from "@/app/hooks";
import { createTask } from "@/features/tasks/tasksSlice";
import { ListCheckIcon, ListOrderedIcon, ListXIcon, PlusIcon } from "lucide-react";
import { useCallback } from "react";
import { useCategory } from "../CategoryContext";

export default function Header() {
  const dispatch = useAppDispatch();
  const { selectedCategory, setSelectedCategory } = useCategory();

  const addTaskHandler = useCallback(() => dispatch(createTask({ title: "New Task" })), [dispatch]);

  const nextCategory = useCallback(
    () => setSelectedCategory((prev) => (prev < 2 ? prev + 1 : 0)),
    [setSelectedCategory],
  );

  return (
    <div className="flex h-10 items-center gap-2">
      <button
        onClick={addTaskHandler}
        className="flex cursor-pointer items-center justify-center gap-1 rounded p-1 pr-2 outline outline-gray-950 hover:bg-gray-50"
      >
        <PlusIcon /> Add Task
      </button>
      <button
        onClick={nextCategory}
        className="flex cursor-pointer gap-1 rounded p-1 pr-2 capitalize outline outline-gray-950 hover:bg-gray-50"
      >
        {selectedCategory === 0 && (
          <>
            <ListOrderedIcon />
            All
          </>
        )}
        {selectedCategory === 1 && (
          <>
            <ListCheckIcon />
            Completed
          </>
        )}
        {selectedCategory === 2 && (
          <>
            <ListXIcon />
            Uncompleted
          </>
        )}
      </button>
    </div>
  );
}
