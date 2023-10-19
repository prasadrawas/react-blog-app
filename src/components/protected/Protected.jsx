import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
import routes from "../../config/routes";
import authService from "../../appwrite/auth-service";
import { login, logout } from "../../store/authSlice";

function Protected({ children, requireAuthentication = true }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    if (requireAuthentication && auth.user === null) {
      // When user is not loaded and authentication is required
      authService
        .getCurrentUser()
        .then((user) => {
          if (user) {
            console.log("User: " + JSON.stringify(user));
            dispatch(login({ user }));
          } else {
            dispatch(logout());
            if (requireAuthentication) {
              navigate(routes.login + `?ref=${currentPath}`);
            }
          }
        })
        .catch((error) => {
          dispatch(logout());
          if (requireAuthentication) {
            navigate(routes.login + `?ref=${currentPath}`);
          }
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [requireAuthentication, auth.user, dispatch, navigate, loading]);

  // Render loading component while user authentication is in progress
  if (loading) {
    return (
      <div className="mt-32 w-full flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  // Render protected content when user authentication is completed
  if (!loading) return <div>{children}</div>;
}

export default Protected;
