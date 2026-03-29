import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
      }}
    >
      <div
        style={{
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.1)",
          padding: "50px",
          borderRadius: "20px",
          maxWidth: "500px",
        }}
      >
        <h1>Job Tracker</h1>
        <p>
          Organize suas candidaturas, acompanhe processos seletivos e aumente
          suas chances de conseguir o emprego ideal.
        </p>
        <button
          onClick={() => navigate("/login")}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Começar agora
        </button>
      </div>
    </div>
  );
}