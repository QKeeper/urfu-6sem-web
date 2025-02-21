import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <>
      <header />
      <main>
        <Outlet />
      </main>
      <footer />
    </>
  );
}
