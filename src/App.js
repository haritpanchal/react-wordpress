import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterUser from "./components/registerUser/RegisterUser";
import LoginUser from "./components/LoginUser";
import Root from "./routes/root";
import ErrorPage from "./routes/error";
import Index from "./routes/index";
import Admin from "./routes/admin";
import EditProfile from "./routes/editProfile";
import ContextProvider from "./context";
import ChangePassword from "./routes/changePassword";

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
        element: <ChangePassword/>,
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
