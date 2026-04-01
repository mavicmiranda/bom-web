import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

type Props = {
  variant: "public" | "app";
};

export default function Header({ variant }: Props) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white/70 backdrop-blur-md">
      {/* Logo / Nome */}
      <h3 className="text-lg font-semibold text-gray-800">
        Carreira Inteligente
      </h3>

      {variant === "public" ? (
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
        >
          Login
        </button>
      ) : (
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700">
            {user?.name}
          </span>

          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            Sair
          </button>
        </div>
      )}              
    </header>
  );
}