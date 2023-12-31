import React, { useEffect, useState } from "react";
import Loading from "../../../common/Loading";
import {
  useDeleteVideoMutation,
  useGetVideosQuery,
} from "../../../features/admin/adminApi";
import ViewModal from "../../../common/ViewModal";
import CreateEditVideo from "./CreateEditVideo";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../../common/ConfirmModal";
import { toast } from "react-toastify";

const VideoList = () => {
  const { data: videos, isLoading } = useGetVideosQuery();
  const [
    deleteVideo,
    { isSuccess: deleteSuccess, isLoading: deleteLoading, isError },
  ] = useDeleteVideoMutation();
  const [openModal, setOpenModal] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    deleteSuccess && toast.success("Video Deleted Successfully");
    isError && toast.warn("Video Deleting Failed");
  }, [deleteSuccess, isError]);
  return (
    <section className="py-6 bg-primary">
      {(isLoading || deleteLoading) && <Loading />}
      <div className="mx-auto max-w-full px-5 lg:px-20">
        <div className="px-3  bg-opacity-10">
          <h4 className="mt-2 text-xl font-extrabold text-black border-b-2 mb-2">
            Videos List
          </h4>
          <div className="flex justify-end">
            <div className="flex">
              <button
                className="btn mr-2"
                onClick={(e) => navigate("/admin/add-video")}
              >
                Add Video
              </button>
              <button className="btn ml-1" onClick={() => navigate(-1)}>
                Back
              </button>
            </div>
          </div>
          <div className="text-black mt-4">
            <table className="divide-y-1 text-base divide-gray-600 w-full">
              <thead>
                <tr>
                  <th className="table-th">SL</th>
                  <th className="table-th">Video Title</th>
                  <th className="table-th">Description</th>
                  <th className="table-th">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-600/50">
                {videos?.length > 0 &&
                  videos.map((video, index) => (
                    <tr key={video.id}>
                      <td className="table-td">{index + 1}</td>
                      <td className="table-td">{video?.title}</td>
                      <td className="table-td">
                        {video?.description?.slice(0, 50)}....
                      </td>
                      <td className="table-td flex gap-x-2">
                        <ConfirmModal
                          text="Are You Sure want to delte this video"
                          confirm={() => {
                            deleteVideo(video.id);
                          }}
                        >
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 hover:text-red-500 cursor-pointer transition-all"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </ConfirmModal>
                        <svg
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 hover:text-blue-500 cursor-pointer transition-all"
                          onClick={() => {
                            navigate(`/admin/edit-video/${video.id}`);
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <ViewModal
        open={openModal}
        onCancel={() => setOpenModal(!openModal)}
        height="500px"
      >
        <CreateEditVideo />
      </ViewModal> */}
    </section>
  );
};

export default VideoList;
