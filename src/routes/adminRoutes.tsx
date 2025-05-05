import { Route } from "react-router-dom";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import ProjectManagement from "../pages/dashboard/admin/ProjectManagement";
import UserManagement from "../pages/dashboard/admin/UserManagement";
import Analytics from "../pages/dashboard/admin/Analytics";
import BillingAdmin from "../pages/dashboard/admin/BillingAdmin";
import ProjectDetail from "../pages/dashboard/admin/ProjectDetail";

export const adminRoutes = [
  <Route
    key="admin-dashboard"
    path="/dashboard/admin"
    element={
      <ProtectedRoute allowedRoles={['admin']}>
        <DashboardLayout>
          <AdminDashboard />
        </DashboardLayout>
      </ProtectedRoute>
    }
  />,
  <Route
    key="project-management"
    path="/dashboard/projects"
    element={
      <ProtectedRoute allowedRoles={['admin']}>
        <DashboardLayout>
          <ProjectManagement />
        </DashboardLayout>
      </ProtectedRoute>
    }
  />,
  <Route
    key="user-management"
    path="/dashboard/users"
    element={
      <ProtectedRoute allowedRoles={['admin']}>
        <DashboardLayout>
          <UserManagement />
        </DashboardLayout>
      </ProtectedRoute>
    }
  />,
  <Route
    key="analytics"
    path="/dashboard/analytics"
    element={
      <ProtectedRoute allowedRoles={['admin']}>
        <DashboardLayout>
          <Analytics />
        </DashboardLayout>
      </ProtectedRoute>
    }
  />,
  <Route
    key="billing-admin"
    path="/dashboard/billing-admin"
    element={
      <ProtectedRoute allowedRoles={['admin']}>
        <DashboardLayout>
          <BillingAdmin />
        </DashboardLayout>
      </ProtectedRoute>
    }
  />,
  <Route
    key="project-detail"
    path="/dashboard/projects/:projectId"
    element={
      <ProtectedRoute allowedRoles={['admin']}>
        <DashboardLayout>
          <ProjectDetail />
        </DashboardLayout>
      </ProtectedRoute>
    }
  />
];
