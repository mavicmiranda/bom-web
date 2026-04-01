import { useAuth } from "../../contexts/AuthContext";
import { FiEdit, FiMapPin } from "react-icons/fi";
import Card from "../../components/ui/Card";

export default function Profile() {
  const { user } = useAuth();
  return (
    <div className="p-6 bg-gradient-to-br from-zinc-950 to-zinc-900 min-h-full text-white">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src="https://i.pravatar.cc/100"
              className="w-20 h-20 rounded-full border-2 border-purple-500"
            />
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-zinc-900" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold">{user?.name}</h1>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                Frontend Developer
              </span>
              <span className="flex items-center gap-1">
                <FiMapPin /> Remoto
              </span>
            </div>
          </div>
        </div>

        <button className="btn-ghost flex items-center gap-2">
          <FiEdit /> Editar perfil
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* COLUNA ESQUERDA */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* IDENTIDADE */}
          <Card title="Identidade Profissional">
            <p className="text-white/70">
              Desenvolvedora focada em criar experiências digitais modernas,
              acessíveis e escaláveis com React e Design Systems.
            </p>
          </Card>

          {/* RESUMO */}
          <Card title="Resumo Profissional">
            <p className="text-white/70">
              Experiência com aplicações web, integração com APIs, e construção
              de interfaces reutilizáveis. Interesse em arquitetura frontend e
              produtos digitais.
            </p>
          </Card>

          {/* SKILLS */}
          <Card title="Habilidades Técnicas">
            <div className="flex flex-wrap gap-2">
              {[
                "React",
                "TypeScript",
                "Tailwind",
                "Node.js",
                "Figma",
                "Design System",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-sm bg-purple-500/20 text-purple-300 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        </div>

        {/* COLUNA DIREITA */}
        <div className="flex flex-col gap-6">
          {/* OBJETIVOS */}
          <Card title="Objetivos de Carreira">
            <div className="text-sm text-white/70 space-y-2">
              <p>
                <strong className="text-white">Cargo:</strong> Frontend
                Developer
              </p>
              <p>
                <strong className="text-white">Salário:</strong> R$ 5k+
              </p>
              <p>
                <strong className="text-white">Modelo:</strong> Remoto
              </p>
            </div>
          </Card>

          {/* RESUME */}
          <Card title="Currículo">
            <div className="space-y-4">
              <div className="p-3 bg-white/5 rounded-lg flex items-center justify-between">
                <span className="text-sm text-white/70">curriculo.pdf</span>
                <button className="text-purple-400 text-sm">Ver</button>
              </div>

              <button className="w-full py-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition">
                Atualizar currículo
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
