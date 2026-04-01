import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";
import { ENV } from "../config/env";

type AuthContextType = {
  user: any;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
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

  async function register(email: string, password: string) {
    try {
      if (ENV.DISABLE_AUTH) {
        setUser({
          name: "Maria",
          email,
        });
        return;
      }

      const response = await api.post("/auth/register", {
        email,
        password,
      });

      /**
       * Existem 2 cenários comuns:
       * 1. API já retorna token + user (igual login)
       * 2. API só cria e você precisa logar depois
       */

      const { token, user } = response.data;

      // 👉 Caso sua API já devolva token
      if (token) {
        localStorage.setItem("token", token);
        api.defaults.headers.Authorization = `Bearer ${token}`;

        setUser(user);
        setToken(token);
      } else {
        // 👉 Caso NÃO devolva token → faz login automático
        await login(email, password);
      }
    } catch (error: any) {
      console.error("Erro no register:", error);

      throw new Error(
        error?.response?.data?.message || "Erro ao registrar usuário",
      );
    }
  }

  function logout() {
  localStorage.removeItem("token");
  delete api.defaults.headers.Authorization;
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
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
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
