import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterUser from "./components/RegisterUser";
import LoginUser from "./components/LoginUser";
import Root from "./routes/Root";
import ErrorPage from "./routes/Error";
import Index from "./routes/Index";
import Admin from "./components/Admin";
import EditProfile from "./components/EditProfile";
import ContextProvider from "./context";
import ChangePassword from "./components/ChangePassword";
import ForgotPassword from "./components/ForgotPassword";
import ConfirmOTP from "./components/ConfirmOTP";
import ResetPassword from "./components/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },

      {
        path: "login/",
        element: <LoginUser />,
      },
      {
        path: "register/",
        element: <RegisterUser />,
      },
      {
        path: "admin/",
        element: <Admin />,
      },
      {
        path: "change-password/",
        element: <ChangePassword />,
      },
      {
        path: "forgot-password/",
        element: <ForgotPassword />,
      },
      {
        path: "confirm-otp/",
        element: <ConfirmOTP />,
      },
      {
        path: "reset-password/",
        element: <ResetPassword />,
      },
      {
        path: "admin/edit/:userId",
        element: <EditProfile />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </>
  );
}

export default App;
