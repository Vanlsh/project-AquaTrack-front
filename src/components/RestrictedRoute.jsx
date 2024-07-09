import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";


const RestrictedRoute = ({ component: Component, redirectTo = "/" }) => {
  const isLoggedIn = true // need to change

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};

export default RestrictedRoute;
