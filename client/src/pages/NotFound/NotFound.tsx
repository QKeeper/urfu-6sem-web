import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-3xl">Page not Found</h1>
      <Link to="/" className="mt-2 flex w-fit items-center gap-1 rounded-md border px-3 py-2">
        Go home <ArrowRightIcon />
      </Link>
    </div>
  );
}

export default NotFound;
