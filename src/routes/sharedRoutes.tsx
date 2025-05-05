
import { Route } from "react-router-dom";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import Settings from "../pages/dashboard/Settings";
import UserProfile from "../pages/dashboard/user/Profile";
import Help from "../pages/dashboard/Help";

export const sharedRoutes = [
  <Route
    key="settings"
    path="/dashboard/settings"
    element={
      <ProtectedRoute>
        <DashboardLayout>
          <Settings />
        </DashboardLayout>
      </ProtectedRoute>
    }
  />,
  <Route
    key="user-profile"
    path="/dashboard/user/profile"
    element={
      <ProtectedRoute>
        <DashboardLayout>
          <UserProfile />
        </DashboardLayout>
      </ProtectedRoute>
    }
  />,
  <Route
    key="help"
    path="/dashboard/help"
    element={
      <ProtectedRoute>
        <DashboardLayout>
          <Help />
        </DashboardLayout>
      </ProtectedRoute>
    }
  />
];
