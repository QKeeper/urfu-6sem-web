import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";
import { lazy } from "react";

const Homepage = lazy(() => import("@/pages/Homepage/Homepage"));
const LoginPage = lazy(() => import("@/pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage/RegisterPage"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
