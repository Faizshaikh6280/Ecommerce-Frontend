import { ReactElement } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  children?: ReactElement;
  isAuthenticated: boolean;
  adminRoute?: boolean;
  isAdmin?: boolean;
  redirect?: string;
  isDisplayError?: boolean;
}

function ProtectedRoute({
  children,
  redirect,
  isAdmin,
  adminRoute,
  isAuthenticated,
}: Props) {
  const { user } = useSelector((store) => store.user);
  if (!isAuthenticated) {
    <Navigate to={redirect} />;
    return;
  }

  if (adminRoute && !isAdmin) return <Navigate to={redirect} />;
  return children ? children : <Outlet />;
}

export default ProtectedRoute;
