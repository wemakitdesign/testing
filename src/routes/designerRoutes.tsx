
import { Route } from "react-router-dom";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import DesignerDashboard from "../pages/dashboard/DesignerDashboard";
import Tasks from "../pages/dashboard/designer/Tasks";
import TaskDetail from "../pages/dashboard/designer/TaskDetail";
import TimeTracking from "../pages/dashboard/designer/TimeTracking";
import Schedule from "../pages/dashboard/designer/Schedule";

export const designerRoutes = [
  <Route
    key="designer-dashboard"
    path="/dashboard/designer"
    element={
      <ProtectedRoute allowedRoles={['designer']}>
        <DashboardLayout>
          <DesignerDashboard />
        </DashboardLayout>
      </ProtectedRoute>
    }
  />,
  <Route
    key="tasks"
    path="/dashboard/tasks"
    element={
      <ProtectedRoute allowedRoles={['designer']}>
        <DashboardLayout>
          <Tasks />
        </DashboardLayout>
      </ProtectedRoute>
    }
  />,
  <Route
    key="task-detail"
    path="/dashboard/tasks/:taskId"
    element={
      <ProtectedRoute allowedRoles={['designer']}>
        <DashboardLayout>
          <TaskDetail />
        </DashboardLayout>
      </ProtectedRoute>
    }
  />,
  <Route
    key="time-tracking"
    path="/dashboard/time-tracking"
    element={
      <ProtectedRoute allowedRoles={['designer']}>
        <DashboardLayout>
          <TimeTracking />
        </DashboardLayout>
      </ProtectedRoute>
    }
  />,
  <Route
    key="schedule"
    path="/dashboard/schedule"
    element={
      <ProtectedRoute allowedRoles={['designer']}>
        <DashboardLayout>
          <Schedule />
        </DashboardLayout>
      </ProtectedRoute>
    }
  />
];
