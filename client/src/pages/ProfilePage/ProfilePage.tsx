import { useAppSelector } from "@/app/hooks";
import { selectUser, selectUserIsPending } from "@/features/auth/authSlice";
import { Link, Navigate, useParams } from "react-router-dom";

function ProfilePage() {
  const authedUser = useAppSelector(selectUser);
  const isPending = useAppSelector(selectUserIsPending);
  const { username } = useParams();

  if (isPending) return null;
  if (!authedUser) return <Navigate replace to="/login" />;

  return (
    <div className="container mx-auto max-w-screen-md">
      <p className="text-3xl">{authedUser.displayName}</p>
      <p className="text-gray-500">@{authedUser.username}</p>
      {username == authedUser.username && (
        <div className="mt-4 flex gap-2">
          <Link to="/edit" className="rounded border border-gray-300 px-3 py-1 text-sm outline-none hover:bg-gray-50">
            Edit Profile
          </Link>
          <Link
            to="/logout"
            className="rounded border border-red-300 px-3 py-1 text-sm text-red-500 outline-none hover:bg-red-50"
          >
            Log Out
          </Link>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
