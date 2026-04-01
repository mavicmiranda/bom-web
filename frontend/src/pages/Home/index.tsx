// pages/Home/index.tsx

import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Kanban from "../../components/Kanban";
import CenteredContainer from "../../components/layout/CenteredContainer";

export default function Home() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  function handleLogout() {
    logout(); // limpa token/user
    navigate("/login"); // 🔥 redireciona
  }

  return (
      <Kanban/>
  );
}
