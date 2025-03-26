import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";
import { lazy } from "react";
import ProfileEditPage from "@/pages/ProfileEditPage/ProfileEditPage";

const Homepage = lazy(() => import("@/pages/Homepage/Homepage"));
const LoginPage = lazy(() => import("@/pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage/RegisterPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage/ProfilePage"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/user/:username" element={<ProfilePage />} />
          <Route path="/edit" element={<ProfileEditPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
