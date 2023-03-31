import AdminPages from "./AdminPages";
import AuthPage from "./AuthPage";
import StudentPages from "./StudentPages";

export const pageReturn = (isAuth, isAdmin) => {
  if (isAuth && isAdmin) {
    return <AdminPages />;
  } else if (isAuth && !isAdmin) {
    return <StudentPages />;
  } else {
    return <AuthPage />;
  }
};
