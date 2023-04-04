import { Avatar } from "@mui/material";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import stringAvatar from "../common/Avtar";
import { useContext } from "react";
import { Context } from "../context";

export default function Root() {
  const { proileBadge } = useContext(Context);
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await localStorage.removeItem("token");
    navigate("/");
  };
  const userToken = localStorage.getItem("token");
  return (
    <>
      <div id="sidebar">
        <nav>
          <ul>
            <li>
              <NavLink
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
                to={"/"}
              >
                Home
              </NavLink>
            </li>
            {!userToken && (
              <>
                <li>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                    to={"/login"}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                    to={"/register"}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
            {userToken && (
              <>
                <li>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                    to={"/admin"}
                  >
                    Account
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                    to={"/change-password"}
                  >
                    Change Password
                  </NavLink>
                </li>
                <li>
                  <Link onClick={logoutHandler}>Logout</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div>{userToken && <Avatar {...stringAvatar(proileBadge)} />}</div>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
