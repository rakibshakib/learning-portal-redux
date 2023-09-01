import React, { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import VideoSideBar from "./VideoSideBar";
import { useGetVideosQuery } from "../../../features/admin/adminApi";
import Loading from "../../../common/Loading";

const CourseVideos = () => {
  const { data: videos, isLoading, isError } = useGetVideosQuery();
  const [currentVideo, setCurrentVideo] = useState({});

  useEffect(() => {
    if (videos?.length > 0) {
      setCurrentVideo(videos?.[0]);
    }
  }, [videos]);
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
