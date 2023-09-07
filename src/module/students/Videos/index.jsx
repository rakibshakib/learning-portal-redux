import React, { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import VideoSideBar from "./VideoSideBar";
import { useGetVideosQuery } from "../../../features/admin/adminApi";
import Loading from "../../../common/Loading";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CourseVideos = () => {
  const { data: videos, isLoading, isError } = useGetVideosQuery();
  const [currentVideo, setCurrentVideo] = useState({});
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  useEffect(() => {
    if (videos?.length > 0) {
      setCurrentVideo(videos?.[0]);
    }
  }, [videos]);
  if (!user?.isApproved) {
    return (
      <section className="py-6 bg-primary">
        <div className="flex flex-col items-center justify-center h-screen text-black">
          <h1 className="text-3xl font-bold text-primary">
            Your account is not approved yet. 😥
          </h1>
          <p className="text-xl text-primary mt-5">
            Please contact with admin.
          </p>
          <p 
            className="text-sm text-blue-800 font-medium underline text-primary mt-5 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            {/* left arrow html icon */} 
            Back to Home
          </p>
        </div>
      </section>
    );
  }
  return (
    <section className="py-6 bg-primary">
      {!isError && isLoading && <Loading />}
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div className="grid grid-cols-3 gap-2 lg:gap-8">
          <VideoPlayer objProps={{ currentVideo }} />
          <VideoSideBar objProps={{ currentVideo, setCurrentVideo, videos }} />
        </div>
      </div>
    </section>
  );
};

export default CourseVideos;
