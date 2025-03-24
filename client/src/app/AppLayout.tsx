import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "./hooks";
import { fetchUser } from "@/features/auth/authSlice";
import AppHeader from "@/components/AppHeader/AppHeader";
import AppFooter from "@/components/AppFooter/AppFooter";

export default function AppLayout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <main>
        <Outlet />
      </main>
      <AppFooter />
    </>
  );
}
