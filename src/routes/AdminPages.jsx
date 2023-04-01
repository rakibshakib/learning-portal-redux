import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminNav from "../common/AdminNav";
import Assignment from "../module/Admin/Assignment";
import FormAssignments from "../module/Admin/Assignment/FormAssignments";
import AssignmentsMarks from "../module/Admin/Assignment/Marks";
import Dashboard from "../module/Admin/Dashboard";
import Quizzes from "../module/Admin/Quizzes";
import VideoList from "../module/Admin/Videos";
import CreateEditVideo from "../module/Admin/Videos/CreateEditVideo";

const AdminPages = () => {
  return (
    <>
      <AdminNav />
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/admin/dashboard" element={<Dashboard />}></Route>
        <Route path="/admin/videos" element={<VideoList />}></Route>
        <Route path="/admin/add-video" element={<CreateEditVideo />}></Route>
        <Route path="/admin/:type/:id" element={<CreateEditVideo />}></Route>
        <Route path="/admin/quizzes" element={<Quizzes />}></Route>

        <Route path="/admin/assignment" element={<Assignment />}></Route>
        <Route
          path="/admin/assignment/add-assignment"
          element={<FormAssignments />}
        ></Route>
        <Route
          path="/admin/assignment/:type/:id"
          element={<FormAssignments />}
        ></Route>
        
        <Route path="/admin/marks" element={<AssignmentsMarks />}></Route>
      </Routes>
    </>
  );
};

export default AdminPages;
