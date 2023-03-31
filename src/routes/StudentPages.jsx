import React from "react";
import { Route, Routes } from "react-router-dom";
import StudentNav from "../common/StudentNav";
import Leaderboard from "../module/students/Leaderboard";
import Quiz from "../module/students/Quiz";
import CourseVideos from "../module/students/Videos";

const StudentPages = () => {
  return (
    <>
      <StudentNav />
      <Routes>
        <Route path="/" element={<CourseVideos />}></Route>
        <Route path="/videos" element={<CourseVideos />}></Route>
        <Route path="/leaderboard" element={<Leaderboard />}></Route>
        <Route path="/quiz/:videoId" element={<Quiz />}></Route>
      </Routes>
    </>
  );
};

export default StudentPages;
