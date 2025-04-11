import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";
import { lazy } from "react";

const Homepage = lazy(() => import("@/pages/Homepage/Homepage"));
const LoginPage = lazy(() => import("@/pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage/RegisterPage"));
const LogoutPage = lazy(() => import("@/pages/LogoutPage/LogoutPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage/ProfilePage"));
const ProfileEditPage = lazy(() => import("@/pages/ProfileEditPage/ProfileEditPage"));
const NotFound = lazy(() => import("@/pages/NotFound/NotFound"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/user/:username" element={<ProfilePage />} />
          <Route path="/edit" element={<ProfileEditPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
    </BrowserRouter>
  );
}
