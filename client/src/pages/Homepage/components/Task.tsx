import { useAppDispatch } from "@/app/hooks";
import { ITask } from "@/features/tasks/tasksModel";
import { modifyTask } from "@/features/tasks/tasksSlice";
import cn from "@/utils/cn";
import { SquareCheckBigIcon, SquareIcon } from "lucide-react";
import { useState } from "react";
import DebouncedInput from "./DebouncedInput";
import { API } from "@/api";

interface TaskProps {
  task: ITask;
}

export default function Task({ task }: TaskProps) {
  const dispatch = useAppDispatch();

  const [completed, setCompleted] = useState(task.completed);

  const toggleTaskHandler = (id: string, completed: boolean) => {
    setCompleted(completed);
    dispatch(modifyTask({ id, completed }));
  };

  const onChangeHandler = (value: string | number | readonly string[] | undefined) => {
    if (value) {
      API.Task.modify(task.id, { title: "" + value });
    }
  };

  return (
    <div className={cn("flex items-center gap-2 rounded px-2 hover:bg-gray-50", { "opacity-40": completed })}>
      <button onClick={() => toggleTaskHandler(task.id, !completed)} className="cursor-pointer">
        {completed ? <SquareCheckBigIcon /> : <SquareIcon />}
      </button>

      <DebouncedInput
        onDebouncedChange={onChangeHandler}
        defaultValue={task.title}
        className="w-full py-2 outline-none"
      />
    </div>
  );
}
