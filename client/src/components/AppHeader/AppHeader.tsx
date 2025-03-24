import { useAppSelector } from "@/app/hooks";
import { selectIsPending, selectUser } from "@/features/auth/authSlice";
import { Link } from "react-router-dom";
import AppHeaderShimmer from "./AppHeaderShimmer";

export default function AppHeader() {
  const user = useAppSelector(selectUser);
  const isPending = useAppSelector(selectIsPending);

  if (isPending) return <AppHeaderShimmer />;

  return (
    <header>
      <div className="container mx-auto gap-1 flex h-10 items-center">
        {<p>User is {"" + user?.username}</p>}
        {!user && (
          <>
            <Link to="/login" className="ml-auto">
              Login
            </Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </header>
  );
}
