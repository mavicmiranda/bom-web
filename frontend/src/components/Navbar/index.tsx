import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

type Props = {
  variant: "public" | "app";
};

export default function Navbar({ variant }: Props) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="top-0 w-full z-50 glass-navbar border-b border-outline/10">
      {variant === "public" ? (
        <div className="flex justify-between items-center px-8 h-20 max-w-8xl">
          <div className="text-2xl font-bold font-headline text-gradient">
            Carreira Inteligente
          </div>

          <div className="flex gap-6">
            <button className="btn-ghost" onClick={() => navigate("/register")}>
              Criar Conta
            </button>

            <button className="btn-primary" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center px-8 h-15 max-w-8xl">
          <span className="text-sm text-gray-300">{user?.name}</span>

          <div className="flex items-center gap-4">
            <button className="btn-primary">+ Adicionar Vaga</button>

            <button onClick={logout} className="btn-ghost">
              <FiLogOut />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
