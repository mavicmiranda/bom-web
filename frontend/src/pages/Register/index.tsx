import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import BaseCard from "../../components/ui/BaseCard";
import CenteredContainer from "../../components/layout/CenteredContainer";
import FormInput from "../../components/ui/FormInput";

export default function Register() {
  const { register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      await register(email, password);
      navigate("/register");
      console.log("Logado com sucesso");
    } catch (err) {
      console.error("Erro ao logar", err);
    }
  }
  return (
    <CenteredContainer>
      <BaseCard>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">
              Cadastro
            </h1>

            <h2 className="text-sm text-white/60 mt-1">Crie sua conta e acompanhe sua carreira</h2>
          </div>

          <FormInput
            label="Email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            label="Senha"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

           <FormInput
            label="Confirmar Senha"
            type="password"
            placeholder="Confirmar Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn-primary mt-4" type="submit">
            Cadastrar
          </button>
        </form>
      </BaseCard>
    </CenteredContainer>
  );
}
