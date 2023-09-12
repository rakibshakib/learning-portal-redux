/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import ConfirmModal from "../../../common/ConfirmModal";
import { useNavigate } from "react-router-dom";
import Loading from "../../../common/Loading";
import moment from "moment";
import useAxiosGet from "../../../hooks/useAxiosGet";
import useAxiosPost from "../../../hooks/useAxiosPost";
const UserApproval = () => {
  const navigate = useNavigate();
  const [userLanding, getDataFn, loading] = useAxiosGet();
  const [, approvedUser, approvedLoading] = useAxiosPost();

  useEffect(() => {
    getDataFn("/users");
  }, []);

  const approvedUserHandler = (user) => {
    const paylod = {
      id: user?.id,
      updated: {
        isApproved: true,
      },
    };
    approvedUser("/users-update", paylod, () => {
      getDataFn("/users");
    });
  };
  return (
    <section className="py-6 bg-primary">
      {(loading || approvedLoading) && <Loading />}
      <div className="mx-auto max-w-full px-5 lg:px-20">
        <div className="px-3 bg-opacity-10">
          <h4 className="mt-2 text-xl font-extrabold text-black border-b-2 mb-2">
            Student Approval
          </h4>
          <ul className="assignment-status">
            <button className="btn ml-1" onClick={() => navigate(-1)}>
              Back
            </button>
          </ul>
          <div className="overflow-x-auto mt-4">
            <table className="divide-y-1 text-base divide-gray-600 w-full text-black">
              <thead>
                <tr>
                  <th className="table-th">SL</th>
                  <th className="table-th">Student Name</th>
                  <th className="table-th">Email</th>
                  <th className="table-th">Join Date</th>
                  <th className="table-th">Role</th>
                  <th className="table-th">Approved Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-600/50">
                {userLanding?.length > 0 &&
                  userLanding.map((user, i) => (
                    <tr key={user?.id}>
                      <td className="table-td">{i + 1}</td>
                      <td className="table-td">{user?.name}</td>
                      <td className="table-td">{user?.email}</td>
                      <td className="table-td">
                        {moment(user?.createdAt).format(
                          "DD MMM YYYY hh:mm:ss A"
                        )}
                      </td>
                      <td className="table-td">{user?.role}</td>
                      {user?.isApproved ? (
                        <td className="table-td text-center">Approved</td>
                      ) : (
                        <td className="table-td  text-center">
                          <div className="flex justify-center">
                            <span className="mr-3">Pending</span>
                            <ConfirmModal
                              text="Are You Sure want to approve this student ?"
                              confirm={() => {
                                approvedUserHandler(user);
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
                          </div>
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

export default UserApproval;
