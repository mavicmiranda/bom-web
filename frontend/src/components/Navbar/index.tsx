import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

type Props = {
  variant: "public" | "app";
};

export default function Navbar({ variant }: Props) {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
      <nav className="fixed top-0 w-full z-50 glass-navbar border-b border-outline/10">
      {variant === "public" ? (
      <div className="flex justify-between items-center px-8 h-20 max-w-8xl">
        <div className="text-2xl font-bold font-headline text-gradient">
          Carreira Inteligente
        </div>

        <div className="flex gap-6">
          <button className="btn-ghost" >
          Criar Conta
        </button>

          <button className="btn-primary" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </div>
    ) : (
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700">
            {user?.name}
          </span>
          <button
            onClick={logout}
            className="btn-ghost"
          >
            Sair
          </button>
        </div>
      )}
      </nav>
  );
}
