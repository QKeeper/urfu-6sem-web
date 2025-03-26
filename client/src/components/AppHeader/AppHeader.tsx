import { useAppSelector } from "@/app/hooks";
import { selectUserIsPending, selectUser } from "@/features/auth/authSlice";
import { Link } from "react-router-dom";
import AppHeaderShimmer from "./AppHeaderShimmer";
import { User2Icon } from "lucide-react";

export default function AppHeader() {
  const user = useAppSelector(selectUser);
  const isPending = useAppSelector(selectUserIsPending);

  if (isPending) return <AppHeaderShimmer />;

  return (
    <header>
      <div className="container mx-auto flex h-10 items-center gap-1">
        {!user ? (
          <>
            <Link to="/login" className="ml-auto">
              Login
            </Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link
              to={"/user/" + user.username}
              className="ml-auto flex items-center justify-center gap-2 rounded px-2 py-1 hover:bg-gray-100"
            >
              <User2Icon className="size-4" />
              {"" + user.username}
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
