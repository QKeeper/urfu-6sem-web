import { useAppDispatch } from "@/app/hooks";
import { ITask } from "@/features/tasks/tasksModel";
import { deleteTask } from "@/features/tasks/tasksSlice";
import cn from "@/utils/cn";
import { TrashIcon } from "lucide-react";
import { ComponentProps, useCallback } from "react";

interface TaskContextMenuProps extends ComponentProps<"div"> {
  task: ITask;
}

export default function TaskContextMenu({ className, task }: TaskContextMenuProps) {
  const dispatch = useAppDispatch();

  const deleteTaskHandler = useCallback(() => {
    dispatch(deleteTask(task.id));
  }, [dispatch, task.id]);

  return (
    <div className={cn("flex", className)}>
      <Button variant="destrictive" onClick={deleteTaskHandler} title={"Delete task " + task.title}>
        <TrashIcon />
      </Button>
    </div>
  );
}

interface ButtonProps extends ComponentProps<"button"> {
  variant?: "default" | "destrictive";
}

function Button({ variant: destructive = "default", className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={cn(
        "flex size-8 cursor-pointer items-center justify-center gap-1 rounded p-1.5 text-gray-500 hover:bg-gray-200",
        { "text-red-400 hover:bg-red-100": destructive == "destrictive" },
        className,
      )}
    />
  );
}
