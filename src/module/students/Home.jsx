import React, { useEffect } from "react";
import userIcon from "../../asset/image/user.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAxiosGet from "../../hooks/useAxiosGet";
import { toast } from "react-toastify";

const Home = () => {
  const { user } = useSelector((state) => state?.profile);
  const navigate = useNavigate();
  const [singleUser, getSingleUser, loading] = useAxiosGet();
  useEffect(() => {
    getSingleUser(`/users/${user?.id}`);
  }, []);
  const handleRouting = (user) => {
    if (user?.isApproved) {
      navigate("/videos");
    } else {
      toast.warn("You don't have permisson to view videos");
    }
  };
  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div className="px-3 md:lg:xl:px-40  py-20 bg-opacity-10">
          <p className="text-center text-xl font-bold mb-5">
            Hello, {user?.name || "User"}, Welcome to Learniverse Portal
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-6 p-8">
            <Link to="/profile" className="dashboard-item-card">
              <img className="w-12 h-12 text-green-500" src={userIcon} alt="" />

              <p className="text-slate-200 mt-3 ">Profile</p>
            </Link>
            <div
              onClick={() => handleRouting(singleUser)}
              className="dashboard-item-card"
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8 text-yellow-500"
              >
                <path
                  strokeLinecap="round"
                  d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                />
              </svg>

              <p className="text-slate-200 mt-3 ">Videos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
