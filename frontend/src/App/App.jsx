import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Routes from "../routes/index";

function App() {
  return (
    <>
      <ToastContainer
        theme="light"
        style={{ width: "36rem", fontSize: "1.6rem" }}
      />
      <div className="App">
        <Routes />
      </div>
    </>
  );
}

export default App;
