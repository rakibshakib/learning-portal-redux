import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loginPortalImage from "../../asset/image/logo.png";
import { useRegisterMutation } from "../../features/auth/authSlice";

const StudentRegistration = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    // id: 1,
  });
  const navigate = useNavigate();
  const [register, { isSuccess, isError, error }] = useRegisterMutation();
  const handleSetter = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.password !== loginData.confirmPassword) {
      return toast.warn("Password doesn't match");
    }
    const payload = {
      email: loginData?.email,
      password: loginData?.password,
      name: loginData?.name,
      // id: Date.now(),
      role: "student",
    };
    register(payload);
  };

  useEffect(() => {
    isSuccess && toast.success("Registration Successfully");
    isSuccess && navigate("/");
    isError && toast.warn(`Registration Failed ${error?.data}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError, error]);
  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <img className="h-12 mx-auto" src={loginPortalImage} alt="img" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
            Create Your New Account
          </h2>
        </div>
        <form className="mt-8 space-y-6 text-black" onSubmit={handleLogin}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="name"
                autoComplete="name"
                required
                className="login-input rounded-t-md"
                placeholder="Name"
                value={loginData?.name}
                onChange={(e) => handleSetter(e)}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="login-input "
                placeholder="Email address"
                value={loginData?.email}
                onChange={(e) => handleSetter(e)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="login-input"
                placeholder="Password"
                value={loginData?.password}
                onChange={(e) => handleSetter(e)}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="confirm-password"
                required
                className="login-input rounded-b-md"
                placeholder="Confirm Password"
                value={loginData?.confirmPassword}
                onChange={(e) => handleSetter(e)}
              />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link
                to="/"
                className="font-medium text-violet-600 hover:text-violet-500"
              >
                Back to login
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default StudentRegistration;
