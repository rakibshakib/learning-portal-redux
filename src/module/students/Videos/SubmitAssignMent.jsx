import React, { useEffect, useState } from "react";
import { useAddAssignmentMutation } from "../../../features/student/studentApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../../../common/Loading";

const SubmitAssignMent = ({ currentVideo, setOpen, assignMent }) => {
  const [repoLink, setRepoLink] = useState("");
  const { name, id } = useSelector((state) => state?.profile?.user);
  const [submitAssignment, { isLoading, isSuccess, isError }] =
    useAddAssignmentMutation();
  const handleSubmitAssignments = (e) => {
    e.preventDefault();
    if (repoLink === "" || !repoLink) {
      return toast.warn("Repository Link Required");
    } else {
      const payload = {
        id: Date.now(),
        student_id: id,
        student_name: name,
        // assignment_id: currentVideo?.id,
        // title: currentVideo?.title,
        assignment_id: assignMent?.id,
        title: assignMent?.title,
        createdAt: new Date().toISOString(),
        totalMark: 100,
        mark: 0,
        repo_link: repoLink,
        status: "pending",
      };
      submitAssignment(payload);
    }
  };
  useEffect(() => {
    isSuccess && toast.success("Assignment Submitted");
    isSuccess && setOpen(false);
    isSuccess && setRepoLink("");

    isError && toast.want("Submitted Failed");
  }, [isSuccess, isError, setOpen]);
  return (
    <div className="bg-primary h-full py-2">
      {isLoading && <Loading />}
      <div className="mx-auto w-full px-5 lg:px-20">
        <form className="mt-8 space-y-6" onSubmit={handleSubmitAssignments}>
          <div className="flex justify-between">
            <h2 className="mt-2 text-3xl font-extrabold text-slate-100">
              Submit Assignments
            </h2>
            <div className="flex justify-between">
              <button
                type="submit"
                className="btn text-xl ml-auto bg-violet-600 hover:bg-violet-700"
              >
                Submit
              </button>
            </div>
          </div>

          <div className="rounded-md shadow-sm -space-y-px">
            <div className="py-1">
              <label htmlFor="repo_link">Repository link: </label>
              <input
                id="repo_link"
                name="repo_link"
                type="text"
                required
                className="login-input rounded-t-md"
                placeholder="Enter Your Repository Link"
                value={repoLink}
                onChange={(e) => setRepoLink(e?.target?.value)}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitAssignMent;
