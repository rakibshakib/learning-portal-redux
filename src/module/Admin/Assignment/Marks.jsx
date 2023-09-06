import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useEditMarksMutation,
  useGetMarksLandingQuery,
} from "../../../features/admin/marksApi";
import ConfirmModal from "../../../common/ConfirmModal";
import moment from "moment";
import Loading from "../../../common/Loading";
import { toast } from "react-toastify";

const AssignmentsMarks = () => {
  const navigate = useNavigate();
  const { data: marksData } = useGetMarksLandingQuery();
  const [saveMark, { isLoading, isError, isSuccess }] = useEditMarksMutation();
  const [marksLanding, setMarksLanding] = useState(marksData || []);
  useEffect(() => {
    const modifed = marksData?.map((item) => ({
      ...item,
      assingMarks: 0,
    }));
    setMarksLanding(modifed);
  }, [marksData]);

  const assignMarkHandeler = (list) => {
    const payload = {
      ...list,
      mark: +list?.assingMarks,
      status: "published",
    };
    saveMark({
      id: list?.id,
      data: payload,
    });
  };
  useEffect(() => {
    isError && toast.warn("Mark Assigned Failed");
    isSuccess && toast.success("Mark Assigned Successfully");
  }, [isError, isSuccess]);
  return (
    <section className="py-6 bg-primary">
      {isLoading && <Loading />}
      <div className="mx-auto max-w-full px-5 lg:px-20">
        <div className="px-3bg-opacity-10">
          <h4 className="mt-2 text-xl font-extrabold text-black border-b-2 mb-2">
            Assignments Marks Entry
          </h4>
          <ul className="assignment-status">
            <li>
              Total <span>{marksLanding?.length}</span>
            </li>
            <li>
              Pending{" "}
              <span>
                {marksLanding?.filter((i) => i?.status === "pending")?.length}
              </span>
            </li>
            <li>
              Mark Sent{" "}
              <span>
                {marksLanding?.filter((i) => i?.status === "published")?.length}
              </span>
            </li>
            <button className="btn ml-1" onClick={() => navigate(-1)}>
              Back
            </button>
          </ul>
          {/* overflow-x-auto */}
          <div className="text-black mt-4">
            <table className="divide-y-1 text-base divide-gray-600 w-full">
              <thead>
                <tr>
                  <th className="table-th">SL</th>
                  <th className="table-th">Assignment</th>
                  <th className="table-th">Date</th>
                  <th className="table-th">Student Name</th>
                  <th className="table-th">Repo Link</th>
                  <th className="table-th">Mark</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-600/50">
                {marksLanding?.length > 0 &&
                  marksLanding.map((mark, idx) => (
                    <tr key={mark?.id}>
                      <td className="table-td">{idx + 1}</td>
                      <td className="table-td">{mark?.title}</td>
                      {/* <td className="table-td">{mark?.createdAt}</td> */}
                      {/* 10 Mar 2023 10:58:13 PM */}
                      <td className="table-td">
                        {moment(mark?.createdAt).format(
                          "DD MMM YYYY hh:mm:ss A"
                        )}
                      </td>
                      <td className="table-td">{mark?.student_name}</td>
                      <td className="table-td">{mark?.repo_link}</td>
                      {mark?.mark > 0 ? (
                        <td className="table-td">{mark?.mark}</td>
                      ) : (
                        <td className="table-td input-mark">
                          <input
                            max="100"
                            value={mark?.assingMarks}
                            type="number"
                            onChange={(e) => {
                              if (+e?.target?.value > 0) {
                                const modified = marksLanding.map((m) => {
                                  if (m?.id === mark?.id) {
                                    return {
                                      ...m,
                                      assingMarks: e?.target?.value,
                                    };
                                  } else {
                                    return m;
                                  }
                                });
                                setMarksLanding(modified);
                              }
                            }}
                          />
                          <ConfirmModal
                            text="Are You Sure want to assign this mark?"
                            confirm={() => {
                              assignMarkHandeler(mark);
                            }}
                          >
                            <svg
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>
                          </ConfirmModal>
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssignmentsMarks;
