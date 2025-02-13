import { Route, Routes } from "react-router-dom";
import CheckAuth from "./components/common/CheckAuth";
import AuthLayout from "./components/auth/AuthLayout";
import AuthLogin from "./pages/auth/AuthLogin";
import AuthRegister from "./pages/auth/AuthRegister";
import { checkAuth } from "./store/auth-slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserDashboardLayout from "./components/userDashboard/UserDashboardLayout";
import Dashboard from "./pages/user/Dashboard";
import TicketListLayout from "./components/userDashboard/TicketListLayout";
import ViewTickets from "./pages/user/ViewTickets";
import AgentDashboardLayout from "./components/agentDashboard/AgentDashboardLayout";
import AgentDashboard from "./pages/agent/AgentDashboard";


export default function App() {
  const dispatch = useDispatch();

  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch]);


  if (isLoading) {
    return <>loading</>;
  }

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

      {/* USER-LIST-TICKETS  */}
      <Route
        path="/view"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <TicketListLayout />
          </CheckAuth>
        }
      >
        <Route path="tickets" element={<ViewTickets />}></Route>
      </Route>

      {/* agent  */}
      <Route
        path="/agent"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AgentDashboardLayout />
          </CheckAuth>
        }
      >
        <Route path="dashboard" element={<AgentDashboard />}></Route>
      </Route>
    </Routes>
  );
}
