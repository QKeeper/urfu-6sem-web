import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logout, selectUser } from "@/features/auth/authSlice";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function LogoutPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  if (!user) return <Navigate to="/" />;

  return null;
}

export default LogoutPage;
