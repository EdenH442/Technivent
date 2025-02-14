import React, { ReactNode, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { userContext, authContext } from "../layouts/home/Home";
import Api from "../../utils/Api";
import { Loader } from "@mantine/core";
interface RouteAuthProps {
  children: ReactNode;
  needAuth: boolean;
}
const RouteAuth: React.FC<RouteAuthProps> = ({ children, needAuth }) => {
  const { setUsername, setUserType } = useContext(userContext);
  const { isAuthenticated, setIsAuthenticated } = useContext(authContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUserData = async () => {
    let isAuth = false;
    const apiService = new Api();
    const response = await apiService.getUserData();
    setIsLoading(false);
    if (response) {
      setUsername(response.data.username);
      setUserType(response.data.userType);
      isAuth = response.data.username.length > 0;
    }
    setIsAuthenticated(isAuth);
  };

  useEffect(() => {
    fetchUserData();
  });
  return isLoading ? (
    <h2>
      Redirecting please wait...
      <br />
      <br />
      <Loader></Loader>
    </h2>
  ) : isAuthenticated ? (
    needAuth ? (
      children
    ) : (
      <Navigate to="/" />
    )
  ) : needAuth ? (
    <Navigate to="/login" />
  ) : (
    children
  );
};

export default RouteAuth;
