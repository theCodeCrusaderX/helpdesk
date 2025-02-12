import { Route, Routes } from "react-router";
import CheckAuth from "./components/common/CheckAuth";
import AuthLayout from "./components/auth/AuthLayout";
import AuthLogin from "./pages/auth/AuthLogin";
import AuthRegister from "./pages/auth/AuthRegister";
import { checkAuth } from "./store/auth-slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserDashboardLayout from "./components/userDashboard/UserDashboardLayout";
import Dashboard from "./pages/user/Dashboard";

export default function App() {
  const dispatch = useDispatch();

  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  console.log(user,isAuthenticated);
  

  useEffect(() => {
    dispatch(checkAuth()).then((res) => console.log('111',res))
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}></CheckAuth>
        }
      ></Route>
      <Route
        path="/auth"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }
      >
        <Route path="Login" element={<AuthLogin />} />
        <Route path="Register" element={<AuthRegister />} />
      </Route>


      {/* user-view  */}
      <Route
        path="/user"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <UserDashboardLayout />
          </CheckAuth>
        }
      >
        <Route path="dashboard" element={<Dashboard />}></Route>

      </Route>
    </Routes>
  );
}
