import { createAppSlice } from "@/app/hooks";
import { IAuthState, IUser } from "./authModel";
import { PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "./authApi";

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
    fetchUser: create.asyncThunk(
      async () => {
        const user = await authAPI.getMe();
        return user;
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
      }
    ),
  }),
  selectors: {
    selectUser: (state) => state.user,
    selectIsPending: (state) => state.isPending,
  },
});

export const { setUser, fetchUser } = authSlice.actions;
export const { selectUser, selectIsPending } = authSlice.selectors;
