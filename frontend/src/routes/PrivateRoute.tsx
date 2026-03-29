// routes/PrivateRoute.tsx

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ENV } from "../config/env";

/**
 * Componente de proteção de rotas.
 *
 * Regras:
 * - Se houver usuário autenticado → renderiza children
 * - Se não → redireciona para login
 *
 * Observação:
 * Pode ser estendido para controle de permissões (ex: admin, user)
 */

export function PrivateRoute() {
  const { token } = useAuth();

  // 🔥 bypass total
  if (ENV.DISABLE_AUTH) {
    return <Outlet />;
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
