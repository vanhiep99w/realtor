import { Navigate, Outlet } from "react-router";
import useAuthStatus from "@/hooks/useAuthStatus.js";
import Spinner from "@/components/Spinner.jsx";

function PrivateRoute(props) {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return <Spinner/>;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default PrivateRoute;
