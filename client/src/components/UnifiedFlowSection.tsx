import { useEffect, useState } from "react";
import {
  BarChart3,
  BookOpen,
  BrainCircuit,
  Check,
  ChevronRight,
  ClipboardList,
  Database,
  LayoutDashboard,
  Mail,
  MessageCircle,
  Send,
  Smartphone,
  Sparkles,
} from "lucide-react";

const sources = [
  { label: "WhatsApp", icon: MessageCircle },
  { label: "Telegram", icon: Send },
  { label: "Formulários", icon: ClipboardList },
  { label: "E-mail", icon: Mail },
];

const destinations = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Gráficos", icon: BarChart3 },
  { label: "Notion", icon: BookOpen },
  { label: "App", icon: Smartphone },
];

const stages = [
  { label: "Entradas conectadas", detail: "mensagens e dados chegam de onde sua operação já acontece" },
  { label: "Dados processados", detail: "regras, integrações e IA organizam o que importa" },
  { label: "Tudo unificado", detail: "a informação aparece no formato ideal para o seu time" },
];

export default function UnifiedFlowSection() {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStage((stage) => (stage + 1) % stages.length);
    }, 2300);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="unified-flow section-grid" id="unificacao" aria-label="Unificação de dados e ferramentas">
      <div className="unified-copy">
        <div className="section-kicker">/ tudo em um só fluxo</div>
        <h2>Informação espalhada vira <em>clareza.</em></h2>
        <p className="unified-lead">Depois da conversa, a Floow processa os dados — com automações e inteligência artificial — e entrega tudo organizado onde sua equipe realmente trabalha.</p>
        <div className="unified-choice"><Sparkles size={16} /><span>Escolha suas ferramentas ou a gente ajuda você a escolher o que for mais adequado.</span></div>
        <div className="unified-status" aria-live="polite"><span className="unified-status-dot" /> {stages[activeStage].label}<small>{stages[activeStage].detail}</small></div>
      </div>

      <div className="unified-visual" aria-label="Fluxo animado de integração entre canais, inteligência artificial e destinos">
        <div className="unified-visual-head"><span>fluxo de dados</span><span><span className="pulse-dot" /> ao vivo</span></div>
        <div className="unified-flow-grid">
          <div className={`unified-column unified-inputs ${activeStage >= 0 ? "is-active" : ""}`}>
            <span className="unified-column-label">receba de onde já acontece</span>
            <div className="unified-node-list">
              {sources.map(({ label, icon: Icon }, index) => <div className={`unified-node unified-source ${activeStage === 0 ? "is-flowing" : ""}`} style={{ "--node-delay": `${index * 90}ms` } as React.CSSProperties} key={label}><Icon size={15} /><span>{label}</span><i /></div>)}
            </div>
          </div>

          <div className="unified-connector unified-connector-in"><span className={activeStage === 0 ? "is-moving" : ""} /></div>

          <div className={`unified-ai-card ${activeStage === 1 ? "is-processing" : ""}`}>
            <div className="unified-ai-icon"><BrainCircuit size={23} /></div>
            <span className="unified-ai-overline">floow intelligence</span>
            <strong>processa<br />e organiza</strong>
            <div className="unified-ai-lines"><i /><i /><i /></div>
            <span className="unified-ai-check"><Check size={11} /> pronto para usar</span>
          </div>

          <div className="unified-connector unified-connector-out"><span className={activeStage === 2 ? "is-moving" : ""} /></div>

          <div className={`unified-column unified-outputs ${activeStage === 2 ? "is-active" : ""}`}>
            <span className="unified-column-label">entregue no formato ideal</span>
            <div className="unified-node-list">
              {destinations.map(({ label, icon: Icon }, index) => <div className={`unified-node unified-destination ${activeStage === 2 ? "is-ready" : ""}`} style={{ "--node-delay": `${index * 90}ms` } as React.CSSProperties} key={label}><Icon size={15} /><span>{label}</span><i /></div>)}
            </div>
          </div>
        </div>
        <div className="unified-visual-foot"><Database size={13} /><span>uma fonte de verdade para o seu negócio</span><ChevronRight size={13} /></div>
        <div className="unified-orbit unified-orbit-a" /><div className="unified-orbit unified-orbit-b" />
      </div>
    </section>
  );
}
