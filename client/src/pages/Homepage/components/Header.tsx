import { useAppDispatch } from "@/app/hooks";
import { createTask } from "@/features/tasks/tasksSlice";
import { ArrowDown01Icon, ArrowDownAZIcon, ListCheckIcon, ListOrderedIcon, ListXIcon, PlusIcon } from "lucide-react";
import { useCallback } from "react";
import { CATEGORY, SORT, useCategory } from "../CategoryContext";

export default function Header() {
  const dispatch = useAppDispatch();
  const { category, nextCategory, sort, nextSort } = useCategory();

  const addTaskHandler = useCallback(() => dispatch(createTask({ title: "New Task" })), [dispatch]);

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
        className="flex cursor-pointer gap-1 rounded p-1 pr-2 outline outline-gray-950 hover:bg-gray-50"
      >
        {category === CATEGORY.ALL && (
          <>
            <ListOrderedIcon />
            All
          </>
        )}
        {category === CATEGORY.COMPLETED && (
          <>
            <ListCheckIcon />
            Completed
          </>
        )}
        {category === CATEGORY.UNCOMPLETED && (
          <>
            <ListXIcon />
            Uncompleted
          </>
        )}
      </button>

      <button className="flex cursor-pointer gap-1 rounded p-1 pr-2 outline outline-gray-950" onClick={nextSort}>
        {sort == SORT.NAME && (
          <>
            <ArrowDownAZIcon />
            By Name
          </>
        )}
        {sort == SORT.CREATED && (
          <>
            <ArrowDown01Icon />
            By Date
          </>
        )}
      </button>
    </div>
  );
}
