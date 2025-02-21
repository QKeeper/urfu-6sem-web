import { useDispatch, useSelector } from "react-redux";
import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});
