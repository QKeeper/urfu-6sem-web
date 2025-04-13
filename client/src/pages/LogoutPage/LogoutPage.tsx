import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logout, selectUser } from "@/features/auth/authSlice";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

interface LogoutPageProps {
  to?: string;
}

function LogoutPage({ to }: LogoutPageProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  if (!user) return <Navigate to={to || "/login"} />;

  return null;
}

export default LogoutPage;
