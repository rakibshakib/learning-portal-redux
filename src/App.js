import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
