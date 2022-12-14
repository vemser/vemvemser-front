import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./Router";
import { ToastContainer } from "react-toastify";
import "./utils/styled.css";
import "nprogress/nprogress.css";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
    <>
      <ToastContainer />
      <Router />
    </>
);
