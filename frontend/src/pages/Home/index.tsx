// pages/Home/index.tsx

import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  function handleLogout() {
    logout(); // limpa token/user
    navigate("/login"); // 🔥 redireciona
  }

  return (
    <div>
      <h1>Minha Home</h1>
      <p>Bem-vinda ao sistema 🚀</p>
      <h1>Bem-vinda {user?.email}</h1>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}
