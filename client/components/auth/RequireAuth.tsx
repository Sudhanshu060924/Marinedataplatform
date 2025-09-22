import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) {
    const to = `/login?redirect=${encodeURIComponent(location.pathname + location.search)}`;
    return <Navigate to={to} replace />;
  }
  return <>{children}</>;
}
