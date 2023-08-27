import React, { useEffect, useState } from "react";
import { currentDate } from "../../../common/utils";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddVideoMutation,
  useEditVideoByIdMutation,
  useGetVideosByIdQuery,
} from "../../../features/admin/adminApi";
import Loading from "../../../common/Loading";
import { toast } from "react-toastify";

const CreateEditVideo = () => {
  const navigate = useNavigate();
  const { type, id } = useParams();
  const [vodeoState, setVideoState] = useState({
    id: null,
    title: "",
    description: "",
    url: "",
    views: "",
    duration: "",
    createdAt: currentDate(),
  });
  const [addVideo, { isLoading, isSuccess: addSuccess }] =
    useAddVideoMutation();
  const [editVideoById, { isLoading: editLoading, isSuccess: editSuccess }] =
    useEditVideoByIdMutation();
  const [isReq, setIsReq] = useState(true);
  const { data: singleVideo, isLoading: singleLoading } = useGetVideosByIdQuery(
    id,
    {
      skip: isReq,
    }
  );
  const resetForm = () => {
    setVideoState({
      id: null,
      title: "",
      description: "",
      url: "",
      views: "",
      duration: "",
      createdAt: currentDate(),
    });
  };

  const handleSubmitVideo = (e) => {
    e.preventDefault();
    if (type === "edit-video") {
      const payload = {
        ...vodeoState,
        id: id || singleVideo?.id,
      };
      editVideoById({
        id: id || singleVideo?.id,
        data: payload,
      });
    } else {
      const payload = {
        ...vodeoState,
      };
      addVideo(payload);
    }
  };
  const handleVideoField = (e) => {
    setVideoState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    if (type === "edit-video") {
      setIsReq(false);
    }
  }, [type, id]);

  useEffect(() => {
    if (id && singleVideo?.id) {
      setVideoState(singleVideo);
    }
  }, [singleVideo, id]);

  useEffect(() => {
    if (addSuccess) {
      resetForm();
      toast.success("New Video Added");
    }
    editSuccess && toast.success("Video Edited Successfully");
  }, [addSuccess, editSuccess]);

  return (
    <section className="py-2 bg-primary grid place-items-center">
      {(singleLoading || editLoading || isLoading) && <Loading />}
      <div className="mx-auto w-full px-5 lg:px-20">
        <form className="mt-8 space-y-6" onSubmit={handleSubmitVideo}>
          <div className="flex justify-between">
            <h2 className="mt-2 text-3xl font-extrabold text-slate-100">
              Add New Video
            </h2>
            <div className="flex justify-between">
              <button
                type="submit"
                // className="btn text-xl ml-auto bg-violet-600 hover:bg-violet-700"
                  className="px-5 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn ml-auto"
                //   className="px-5 border border-transparent text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Back
              </button>
            </div>
          </div>

          <div className="rounded-md shadow-sm -space-y-px">
            <div className="py-1">
              <label htmlFor="title">Video Title: </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                className="login-input rounded-t-md"
                placeholder="Video Title"
                value={vodeoState?.title}
                onChange={(e) => handleVideoField(e)}
              />
            </div>
            <div className="py-1">
              <label htmlFor="description">Video Description: </label>
              <input
                id="description"
                name="description"
                type="text"
                required
                className="login-input rounded-b-md"
                placeholder="Video Description"
                value={vodeoState?.description}
                onChange={(e) => handleVideoField(e)}
              />
            </div>
            <div className="py-1">
              <label htmlFor="url">Video URL: </label>

              <input
                id="url"
                name="url"
                type="text"
                required
                className="login-input rounded-b-md"
                placeholder="Video Url"
                value={vodeoState?.url}
                onChange={(e) => handleVideoField(e)}
              />
            </div>
            <div className="py-1">
              <label htmlFor="views">Video Views: </label>

              <input
                id="views"
                name="views"
                type="text"
                required
                className="login-input rounded-b-md"
                placeholder="Video views"
                value={vodeoState?.views}
                onChange={(e) => handleVideoField(e)}
              />
            </div>
            <div className="py-1">
              <label htmlFor="duration">Video Duration: </label>

              <input
                id="duration"
                name="duration"
                type="text"
                required
                className="login-input rounded-b-md"
                placeholder="Video duration"
                value={vodeoState?.duration}
                onChange={(e) => handleVideoField(e)}
              />
            </div>
          </div>
          {/* <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Add Video
            </button>
          </div> */}
        </form>
      </div>
    </section>
  );
};

export default CreateEditVideo;
