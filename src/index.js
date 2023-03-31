import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterUser from "./components/registerUser/RegisterUser";
import LoginUser from "./components/LoginUser";
import Root from "./routes/root";
import ErrorPage from "./routes/error";
import Index from "./routes/index";
import Admin from "./routes/admin";
import EditProfile from "./routes/editProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },

      {
        path: "login/",
        element:<LoginUser/> 
      },
      {
        path: "register/",
        element:<RegisterUser/> 
      },
      {
        path: "admin/",
        element:<Admin/> 
      },
      {
        path: "admin/edit/:userId",
        element:<EditProfile/> 
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
