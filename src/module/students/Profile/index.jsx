import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAxiosPost from "../../../hooks/useAxiosPost";
import useAxiosGet from "../../../hooks/useAxiosGet";
import { toast } from "react-toastify";
import { updateName } from "../../../features/users/userSlice";
import Loading from "../../../common/Loading";

const ProfileLanding = () => {
  const { user, token } = useSelector((state) => state?.profile);
  const navigate = useNavigate();
  const [isUpdate, setIsUpdate] = useState(false);
  const [singleUser, getSingleUser, loading, setUser] = useAxiosGet();
  const dispatch = useDispatch();
  const [, updateUser, updateLanding] = useAxiosPost();
  const [name, setName] = useState("");

  const handleName = () => (e) => {
    setName(e?.target?.value);
  };
  const handleUpdate = () => {
    if (isUpdate) {
      const paylod = {
        id: user?.id,
        updated: {
          name,
        },
      };
      updateUser("/users-update", paylod, () => {
        getSingleUser(`/users/${user?.id}`);
        setIsUpdate(false);
        dispatch(
          updateName({
            name,
          })
        );
        localStorage.setItem(
          "auth",
          JSON.stringify({
            accessToken: token,
            user: {
              ...singleUser,
              name: name,
            },
          })
        );
        return toast.success("Name update successfully");
      });
    } else {
      setIsUpdate(true);
    }
  };
  useEffect(() => {
    getSingleUser(`/users/${user?.id}`, (res) => {
      setName(user?.name);
      setUser(res);
    });
    setName(user?.name);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="py-6 bg-primary">
      {(loading || updateLanding) && <Loading />}

      <div className="mx-auto max-w-full px-5 lg:px-20">
        <div className="px-3 py-20 bg-opacity-10">
          <div className="flex justify-end">
            <div className="flex">
              <button className="btn ml-1" onClick={() => navigate(-1)}>
                Back
              </button>
            </div>
          </div>
          <div className="ring-2 ring-slate-400 px-3 py-5 my-5 rounded-md h-[200px]">
            <div className="flex justify-center">
              <div className="text-black">
                <div className="flex justify-start items-center ">
                  <p className="mr-3">Name: </p>
                  {isUpdate ? (
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="login-input rounded-t-md mr-2"
                      placeholder="Update Name"
                      value={name}
                      onChange={handleName()}
                    />
                  ) : (
                    <p className="login-input rounded-t-md mr-2">
                      {singleUser?.name}
                    </p>
                  )}
                  <button
                    className="btn w-[100px] mr-l px-4"
                    onClick={(e) => handleUpdate()}
                  >
                    Update
                  </button>
                </div>
                <div className="flex justify-start items-center my-2">
                  <p className="mr-3">Email: </p>
                  <p className="login-input rounded-t-md">
                    {singleUser?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileLanding;
