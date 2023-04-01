import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { pageReturn } from "./routes/helper";
import { setProfile } from "./features/users/userSlice";

function App() {
  const { isAuth, isAdmin } = useSelector((state) => state?.profile);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const localAuth = localStorage?.getItem("auth");
    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (auth?.accessToken && auth?.user) {
        dispatch(
          setProfile({
            accessToken: auth.accessToken,
            user: auth.user,
          })
        );
      }
    }
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        {pageReturn(isAuth, isAdmin)}
        <ToastContainer
          position="top-center"
          newestOnTop={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          autoClose={1500}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
