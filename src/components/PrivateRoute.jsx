import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../redux/auth/selectors";

const PrivateRoute = ({ component: Component, redirectTo = "/" }) => {
  const token = useSelector(selectToken);

  return token ? Component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
