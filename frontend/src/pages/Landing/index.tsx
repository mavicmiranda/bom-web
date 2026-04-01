import { useNavigate } from "react-router-dom";
import BaseCard from "../../components/ui/BaseCard";
import CenteredContainer from "../../components/layout/CenteredContainer";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <CenteredContainer
    >
     <BaseCard>
        <h1>Job Tracker</h1>
        <p>
          Organize suas candidaturas, acompanhe processos seletivos e aumente
          suas chances de conseguir o emprego ideal.
        </p>
        <button className="btn-primary" onClick={() => navigate("/resgister")}>
          Começar agora
        </button>
      </BaseCard>
    </CenteredContainer>
  );
}