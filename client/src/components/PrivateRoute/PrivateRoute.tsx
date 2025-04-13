import { useAppSelector } from "@/app/hooks";
import { Permission } from "@/features/auth/authModel";
import { selectUser, selectUserIsPending } from "@/features/auth/authSlice";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  permissions?: Permission[];
}

export default function PrivateRoute({ permissions }: PrivateRouteProps) {
  const user = useAppSelector(selectUser);
  const isPending = useAppSelector(selectUserIsPending);

  if (isPending) return null;
  if (!user) return <Navigate replace to="/login" />;

  if (permissions) {
    let access = false;
    permissions.forEach((permission) => {
      if ((user.role.permission & permission) === permission) access = true;
    });

    if (!access) return <Navigate replace to="/" />;
  }

  return (
    <Suspense>
      <Outlet />
    </Suspense>
  );
}
