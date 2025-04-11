import { useAppSelector } from "@/app/hooks";
import { Permission } from "@/features/auth/authModel";
import { selectUser, selectUserIsPending } from "@/features/auth/authSlice";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  permissions?: Permission[];
}

export default function PrivateRoute({ permissions }: PrivateRouteProps) {
  const user = useAppSelector(selectUser);
  const isPending = useAppSelector(selectUserIsPending);

  if (!user) {
    if (!isPending) return <Navigate replace to="/login" />;
    return null;
  }

  if (permissions) {
    let access = false;
    permissions.forEach((permission) => {
      if ((user.role.permission & permission) === permission) access = true;
    });

    if (!access) return <Navigate replace to="/" />;
  }

  return <Outlet />;
}
