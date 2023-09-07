import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../common/Loading";
import {
  useCheckAssignmentSubmittedByStudentQuery,
  useGetAssignmentByIdQuery,
  useGetQuizzesByIdQuery,
} from "../../../features/student/studentApi";
import ViewModal from "../../../common/ViewModal";
import SubmitAssignMent from "./SubmitAssignMent";
import { useSelector } from "react-redux";

const VideoPlayer = ({ objProps }) => {
  const { currentVideo } = objProps || {};
  const { id } = useSelector((state) => state?.profile?.user);
  const [isReq, setIsReq] = useState(true);
  const [isReq2, setIsReq2] = useState(true);
  const [checkAssignmentSubmitted, iSCheckAssignmentSubmitted] = useState(true);
  const { data: assignMent } = useGetAssignmentByIdQuery(currentVideo?.id, {
    skip: isReq,
  });
  const { data: videoQuize } = useGetQuizzesByIdQuery(currentVideo?.id, {
    skip: isReq2,
  });
  const { data: submittedAssignment } =
    useCheckAssignmentSubmittedByStudentQuery(
      {
        vidId: assignMent?.id || " ",
        stuId: id,
      },
      {
        skip: checkAssignmentSubmitted,
      }
    );
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (currentVideo?.id) {
      setIsReq(false);
      setIsReq2(false);
    }
  }, [currentVideo]);
  useEffect(() => {
    if (assignMent?.id) {
      iSCheckAssignmentSubmitted(false);
    }
  }, [assignMent, currentVideo]);
  return (
    <div className="col-span-full w-full space-y-8 lg:col-span-2">
      {!currentVideo?.title && <Loading />}
      <iframe
        width="100%"
        className="aspect-video"
        src={currentVideo?.url}
        title={currentVideo?.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <div>
        <h1 className="text-lg font-bold tracking-tight text-black">
          {currentVideo?.title}
        </h1>
        <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
          Uploaded on {moment(currentVideo?.createdAt).format("DD MMM YYYY")}
        </h2>

        <div className="flex gap-4">
          {assignMent?.title && (
            <>
              {submittedAssignment?.length > 0 ? (
                <p className="cursor-pointer px-3 font-bold py-1 border border-cyan text-black rounded-full text-sm hover:bg-cyan hover:text-primary">
                  Assignment Marks: {submittedAssignment?.[0]?.mark} out of{" "}
                  {submittedAssignment?.[0]?.totalMark}
                </p>
              ) : (
                <p
                  onClick={() => setOpen(true)}
                  className="cursor-pointer px-3 font-bold py-1 border border-cyan text-black rounded-full text-sm hover:bg-cyan hover:text-primary"
                >
                  এসাইনমেন্ট
                </p>
              )}
            </>
          )}
          {videoQuize?.length > 0 && (
            <Link
              to={`/quiz/${currentVideo?.id}`}
              className="px-3 font-bold py-1 border border-cyan text-black rounded-full text-sm hover:bg-cyan hover:text-primary"
            >
              কুইজে অংশগ্রহণ করুন
            </Link>
          )}
        </div>
        <p className="mt-4 text-sm text-slate-400 leading-6">
          {currentVideo?.description}
        </p>
      </div>
      <ViewModal
        open={open}
        onCancel={() => setOpen(false)}
        title={assignMent?.title}
        height={"30vh"}
      >
        <SubmitAssignMent
          currentVideo={currentVideo}
          setOpen={setOpen}
          assignMent={assignMent}
        />
      </ViewModal>
    </div>
  );
};

export default VideoPlayer;
