import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, redirectTo = "/" }) => {
  const isLoggedIn = true; // need to change

  return isLoggedIn ? Component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
