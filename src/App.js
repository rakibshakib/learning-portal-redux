import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { pageReturn } from "./routes/helper";

function App() {
  const { isAuth, isAdmin } = useSelector((state) => state?.users?.profile);
  // console.log(profile);
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
