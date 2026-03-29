import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

type Props = {
  variant: "public" | "app";
};

export default function Navbar({ variant }: Props) {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
      <nav className="fixed top-0 w-full z-50 glass border-b border-outline/10">
      {variant === "public" ? (
      <div className="flex justify-between items-center px-8 h-20 max-w-7xl">
        <div className="text-2xl font-bold font-headline text-gradient">
          Carreira Inteligente
        </div>

        <div className="flex gap-4">
          <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
        >
          Login
        </button>

          <button className="bg-gradient-to-r from-primary to-primary-container px-6 py-2 rounded-full text-black font-bold">
            Get Started
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
            className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            Sair
          </button>
        </div>
      )}
      </nav>
  );
}
