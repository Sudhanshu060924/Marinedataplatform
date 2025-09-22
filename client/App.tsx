import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MainLayout from "@/components/layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import Placeholder from "@/components/Placeholder";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import { AuthProvider } from "@/context/AuthContext";
import DataExplorer, { DataExplorerFull } from "@/pages/DataExplorer";
import Upload from "@/pages/Upload";
import RequireAuth from "@/components/auth/RequireAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/data-explorer" element={<DataExplorer />} />
              <Route
                path="/data-explorer/full"
                element={<DataExplorerFull />}
              />
              <Route path="/upload" element={<RequireAuth><Upload /></RequireAuth>} />
              <Route
                path="/ai-insights"
                element={
                  <Placeholder
                    title="AI Insights"
                    description="Currently We are working on this."
                    externalHref="https://4424a176b1894a15b261d7c4e770838e-9fd98def412d4ac0b5a0a85eb.fly.dev/"
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Placeholder
                    title="Profile"
                    description="Simple profile page after login."
                  />
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
