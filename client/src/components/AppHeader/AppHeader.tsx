import { useAppSelector } from "@/app/hooks";
import { selectUserIsPending, selectUser } from "@/features/auth/authSlice";
import { Link, LinkProps } from "react-router-dom";
import AppHeaderShimmer from "./AppHeaderShimmer";
import { User2Icon } from "lucide-react";
import cn from "@/utils/cn";

export default function AppHeader() {
  const user = useAppSelector(selectUser);
  const isPending = useAppSelector(selectUserIsPending);

  if (isPending) return <AppHeaderShimmer />;

  return (
    <header className="border-b border-gray-300">
      <div className="container mx-auto flex h-10 items-center gap-1 px-1">
        <NavLink to="/">Home</NavLink>
        {!user ? (
          <>
            <NavLink to="/login" className="ml-auto">
              Login
            </NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        ) : (
          <>
            <NavLink to={"/user/" + user.username} className="ml-auto">
              <User2Icon className="size-4" />
              {user.displayName}
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
}

function NavLink({ className, ...rest }: LinkProps) {
  return (
    <Link
      {...rest}
      className={cn("flex items-center justify-center gap-2 rounded px-2 py-1 hover:bg-gray-100", className)}
    />
  );
}
