import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";
import { ENV } from "../config/env";

type AuthContextType = {
  user: any;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  async function login(email: string, password: string) {

    if (ENV.DISABLE_AUTH) {
      setUser({
        name: "Maria",
        email,
      });

      return;
    }

    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const { token, user } = response.data;

    // salva token
    localStorage.setItem("token", token);

    // seta no axios automaticamente
    api.defaults.headers.Authorization = `Bearer ${token}`;

    setUser(user);
    setToken(token);
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  // 🔄 persistência ao recarregar
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;

      // opcional: buscar usuário novamente
      api
        .get("/auth/me")
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          logout();
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth precisa estar dentro do AuthProvider");
  }

  return context;
}
