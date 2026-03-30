import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import BaseCard from "../../components/ui/BaseCard";
import CenteredContainer from "../../components/layout/CenteredContainer";
import FormInput from "../../components/ui/FormInput";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/home");
      console.log("Logado com sucesso");
    } catch (err) {
      console.error("Erro ao logar", err);
    }
  }

  return (
    <CenteredContainer>
      <BaseCard>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>

          <FormInput
            label="Email address"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            label="Password"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn-primary mt-4" type="submit">Entrar</button>
        </form>
      </BaseCard>
    </CenteredContainer>
  );
}
