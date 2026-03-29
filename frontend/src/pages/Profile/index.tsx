import { useAuth } from "../../contexts/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Meu Perfil</h1>
      <p>{user?.name}</p>
    </div>
  );
}
