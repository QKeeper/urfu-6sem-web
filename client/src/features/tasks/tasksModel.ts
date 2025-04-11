export interface ITasksState {
  isPending: boolean;
  tasks: ITask[];
}

export interface ITask {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
  createdAt: string;
  editiedAt: string;
}
