import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLogin from "../module/auth/AdminLogin";
import StudentLogin from "../module/auth/StudentLogin";
import StudentRegistration from "../module/auth/StudentRegistration";
import NotFound from "../common/NotFound";

const AuthPage = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentLogin />}></Route>
      <Route path="/register" element={<StudentRegistration />}></Route>
      <Route path="/admin" element={<AdminLogin />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};

export default AuthPage;
