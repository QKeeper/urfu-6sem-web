import { createAppSlice } from "@/app/hooks";
import { IAuthState, IUser } from "./authModel";
import { PayloadAction } from "@reduxjs/toolkit";
import { API } from "@/api";
import { ILoginFields } from "@/api.models";

const initialState: IAuthState = {
  isPending: true,
  user: null,
};

export const authSlice = createAppSlice({
  name: "auth-slice",
  initialState,
  reducers: (create) => ({
    setUser: create.reducer((state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    }),
    loginUser: create.asyncThunk(
      async (data: ILoginFields) => {
        await API.Auth.login(data);
        return await API.Auth.me();
      },
      {
        pending: (state) => {
          state.isPending = true;
        },
        fulfilled: (state, action) => {
          state.isPending = false;
          state.user = action.payload;
        },
        rejected: (state) => {
          state.isPending = false;
        },
      },
    ),
    fetchUser: create.asyncThunk(API.Auth.me, {
      pending: (state) => {
        state.isPending = true;
      },
      fulfilled: (state, action) => {
        state.isPending = false;
        state.user = action.payload;
      },
      rejected: (state) => {
        state.isPending = false;
      },
    }),
    logout: create.asyncThunk(API.Auth.logout, {
      pending: (state) => {
        state.isPending = true;
      },
      fulfilled: (state) => {
        state.user = null;
        state.isPending = false;
      },
      rejected: (state) => {
        state.isPending = false;
      },
    }),
  }),
  selectors: {
    selectUser: (state) => state.user,
    selectUserIsPending: (state) => state.isPending,
  },
});

export const { loginUser, setUser, fetchUser, logout } = authSlice.actions;
export const { selectUser, selectUserIsPending } = authSlice.selectors;
