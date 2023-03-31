import AdminLogin from "../module/auth/AdminLogin";
import StudentLogin from "../module/auth/StudentLogin";
import StudentRegistration from "../module/auth/StudentRegistration";

export const adminRoute = [
  {
    path: "/admin/login",
    component: AdminLogin,
  },
];
export const studentRoute = [
  {
    path: "/login",
    component: StudentLogin,
  },
];
export const authRoute = [
  {
    path: "/admin/login",
    component: AdminLogin,
  },
  {
    path: "/login",
    component: StudentLogin,
  },
  {
    path: "/sign-up",
    component: StudentRegistration,
  },
];
