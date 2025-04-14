import { useAppSelector } from "@/app/hooks";
import { CATEGORY, SORT, useTaskFilterSort } from "../TaskFilterSortContext";
import Task from "./Task";
import { selectTasks } from "@/features/tasks/tasksSlice";

export default function TaskList() {
  const tasks = useAppSelector(selectTasks);
  const { category, sort } = useTaskFilterSort();

  const filteredTasks = tasks.filter((task) => {
    if (category === CATEGORY.ALL) return true;
    return task.completed === (category === CATEGORY.COMPLETED);
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sort == SORT.NAME) return a.title.localeCompare(b.title);
    if (sort == SORT.CREATED) return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    else return 0;
  });

  return (
    <div className="flex flex-col">
      {sortedTasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}
