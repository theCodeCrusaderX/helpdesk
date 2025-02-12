import { Navigate, useLocation } from "react-router";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  console.log('222',user);
  

  console.log(location,"loooooooooooooooocaaaaaaaaaaaatioooooooooooooooooooon");

  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    } else {
      if (user?.role === "agent") {
        return <Navigate to="/agent/dashboard" />;
      } else {
        return <Navigate to="/user/dashboard" />;
      }
    }
  }

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "agent") {
      return <Navigate to="/agent/dashboard" />;
    } else {
      return <Navigate to="/user/dashboard" />;
    }
  }

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  if (
    isAuthenticated &&
    user?.role === "agent" &&
    location.pathname.includes("user")
  ) {
    return <Navigate to="/agent/dashboard" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
