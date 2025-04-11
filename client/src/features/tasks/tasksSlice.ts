import { createAppSlice } from "@/app/hooks";
import { ITask, ITasksState } from "./tasksModel";
import { API } from "@/api";

const initialState: ITasksState = {
  isPending: true,
  tasks: [],
};

export const tasksSlice = createAppSlice({
  name: "tasks-slice",
  initialState,
  reducers: (create) => ({
    createTask: create.asyncThunk(API.Task.create, {
      fulfilled: (state, action) => {
        state.tasks.push(action.payload);
      },
    }),
    fetchMyTasks: create.asyncThunk(API.Task.getMy, {
      pending: (state) => {
        state.isPending = true;
      },
      fulfilled: (state, action) => {
        state.isPending = false;
        state.tasks = action.payload.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      },
      rejected: (state) => {
        state.isPending = false;
      },
    }),
    modifyTask: create.asyncThunk<ITask, Pick<ITask, "id"> & Partial<ITask>>(
      ({ id, completed, title }) => API.Task.modify(id, { title, completed }),
      {
        fulfilled: (state, action) => {
          state.tasks = state.tasks.map((task) => (task.id === action.payload.id ? action.payload : task));
        },
      },
    ),
  }),
  selectors: { selectTasks: (state) => state.tasks, selectIsPending: (state) => state.isPending },
});

export const { fetchMyTasks, createTask, modifyTask } = tasksSlice.actions;
export const { selectTasks, selectIsPending: selectTasksIsPending } = tasksSlice.selectors;
