
import { Route } from "react-router-dom";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import ClientDashboard from "../pages/dashboard/ClientDashboard";
import NewRequest from "../pages/dashboard/client/NewRequest";
import RequestHistory from "../pages/dashboard/client/RequestHistory";
import RequestDetail from "../pages/dashboard/client/RequestDetail";
import ClientBilling from "../pages/dashboard/client/Billing";

export const clientRoutes = [
  <Route
    key="client-dashboard"
    path="/dashboard"
    element={
      <ProtectedRoute allowedRoles={['client']}>
        <DashboardLayout>
          <ClientDashboard />
        </DashboardLayout>
      </ProtectedRoute>
    }
  />,
  <Route
    key="client-dashboard-alt"
    path="/dashboard/client"
    element={
      <ProtectedRoute allowedRoles={['client']}>
        <DashboardLayout>
          <ClientDashboard />
        </DashboardLayout>
      </ProtectedRoute>
    }
  />,
  <Route
    key="new-request"
    path="/dashboard/requests/new"
    element={
      <ProtectedRoute allowedRoles={['client']}>
        <DashboardLayout>
          <NewRequest />
        </DashboardLayout>
      </ProtectedRoute>
    }
  />,
  <Route
    key="request-history"
    path="/dashboard/requests/history"
    element={
      <ProtectedRoute allowedRoles={['client']}>
        <DashboardLayout>
          <RequestHistory />
        </DashboardLayout>
      </ProtectedRoute>
    }
  />,
  <Route
    key="request-detail"
    path="/dashboard/requests/:requestId"
    element={
      <ProtectedRoute allowedRoles={['client']}>
        <DashboardLayout>
          <RequestDetail />
        </DashboardLayout>
      </ProtectedRoute>
    }
  />,
  <Route
    key="client-billing"
    path="/dashboard/billing"
    element={
      <ProtectedRoute allowedRoles={['client']}>
        <DashboardLayout>
          <ClientBilling />
        </DashboardLayout>
      </ProtectedRoute>
    }
  />
];
