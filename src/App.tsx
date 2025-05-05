
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import { publicRoutes } from "./routes/publicRoutes";
import { clientRoutes } from "./routes/clientRoutes";
import { designerRoutes } from "./routes/designerRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { sharedRoutes } from "./routes/sharedRoutes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {publicRoutes}
            {clientRoutes}
            {designerRoutes}
            {adminRoutes}
            {sharedRoutes}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
