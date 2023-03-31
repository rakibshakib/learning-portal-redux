import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLogin from "../module/auth/AdminLogin";
import StudentLogin from "../module/auth/StudentLogin";
import StudentRegistration from "../module/auth/StudentRegistration";

const AuthPage = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentLogin />}></Route>
      <Route path="/register" element={<StudentRegistration />}></Route>
      <Route path="/admin/login" element={<AdminLogin />}></Route>
    </Routes>
  );
};

export default AuthPage;
