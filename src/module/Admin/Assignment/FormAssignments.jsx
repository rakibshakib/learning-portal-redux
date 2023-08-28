import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../../common/Loading";
import { useGetVideosQuery } from "../../../features/admin/adminApi";
import {
  useAddAssignmentsMutation,
  useEditAssignmentsByIdMutation,
  useGetassignmentsByIdQuery,
} from "../../../features/admin/assignmentsApi";

const FormAssignments = () => {
  const navigate = useNavigate();
  const { type, id } = useParams();
  const { data: videosDDL } = useGetVideosQuery();
  const [isReq, setIsReq] = useState(true);

  const { data: singleAssignment } = useGetassignmentsByIdQuery(id, {
    skip: isReq,
  });
  const [saveAssingment, { isLoading: saving, isSuccess: addSuccess }] =
    useAddAssignmentsMutation();
  const [editAssingment, { isLoading: editing, isSuccess: editSuccess }] =
    useEditAssignmentsByIdMutation();
  const [assignments, setAssignments] = useState({
    id: null,
    title: "",
    video_id: null,
    video_title: "",
    totalMark: 100,
  });
  const resetForm = () => {
    setAssignments({
      id: null,
      title: "",
      video_id: null,
      video_title: "",
      totalMark: 100,
    });
  };
  const handleField = (e) => {
    setAssignments((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmitAssignments = (e) => {
    e.preventDefault();
    if (type === "edit-assignment") {
      const payload = {
        ...assignments,
        totalMark: +assignments.totalMark,
        id: assignments?.id,
      };
      editAssingment({
        id: singleAssignment?.id,
        data: payload,
      });
    } else {
      const payload = {
        ...assignments,
        totalMark: +assignments.totalMark,
      };
      saveAssingment(payload);
    }
  };
  useEffect(() => {
    if (type === "edit-assignment") {
      setIsReq(false);
    }
  }, [type, id]);

  useEffect(() => {
    if (id && singleAssignment?.id) {
      setAssignments(singleAssignment);
    }
  }, [singleAssignment, id]);

  useEffect(() => {
    if (addSuccess) {
      resetForm();
      toast.success("New Assignment Added");
    } else {
      editSuccess && toast.success("Assignment Edited Successfully");
    }
  }, [addSuccess, editSuccess]);
  return (
    <section className="py-2 bg-primary grid place-items-center border-spacing-8 shadow-2xl">
      {(saving || editing) && <Loading />}
      <div className="mx-auto w-full px-5 lg:px-20">
        <form className="mt-8 space-y-6" onSubmit={handleSubmitAssignments}>
          <div className="flex justify-between">
            <h2 className="mt-2 text-3xl font-extrabold text-slate-100">
              Add New Assignments
            </h2>
            <div className="flex justify-between">
              <button
                type="submit"
                className="btn text-xl ml-auto bg-violet-600 hover:bg-violet-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn ml-auto"
              >
                Back
              </button>
            </div>
          </div>

          <div className="rounded-md shadow-sm -space-y-px">
            <div className="py-1">
              <label htmlFor="title">Assignments Title: </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                className="login-input rounded-t-md"
                placeholder="Video Title"
                value={assignments?.title}
                onChange={(e) => handleField(e)}
              />
              <div className="py-1">
                <label htmlFor="title">Select Assigned Video: </label>
                <select
                  className="login-input rounded-t-md"
                  name="video_title"
                  id="video_title"
                  required
                  value={assignments?.video_title}
                  onChange={(e) => {
                    const findVideo = videosDDL.find(
                      (v) => v.title === e?.target?.value
                    );
                    setAssignments((prev) => ({
                      ...prev,
                      video_title: findVideo?.title,
                      video_id: findVideo?.id,
                    }));
                  }}
                >
                  <option value="" hidden selected>
                    Select Video
                  </option>
                  {videosDDL?.length > 0 &&
                    videosDDL.map((m) => (
                      <option key={m?.id} value={m?.title}>
                        {m?.title}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="py-1">
              <label htmlFor="description">Total Mark: </label>
              <input
                id="totalMark"
                name="totalMark"
                type="number"
                min={0}
                required
                className="login-input rounded-b-md"
                placeholder="Video Description"
                value={assignments?.totalMark}
                onChange={(e) => handleField(e)}
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default FormAssignments;
