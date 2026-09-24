import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  BrainCircuit,
  Check,
  ChevronRight,
  ClipboardList,
  Database,
  Globe,
  LayoutDashboard,
  Mail,
  MessageCircle,
  Send,
  Smartphone,
  Sparkles,
  Users,
} from "lucide-react";

const sources = [
  { label: "WhatsApp", icon: MessageCircle },
  { label: "Telegram", icon: Send },
  { label: "Formulários", icon: ClipboardList },
  { label: "E-mail", icon: Mail },
  { label: "CRM", icon: Users },
];

const destinations = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Notion", icon: BookOpen },
  { label: "App", icon: Smartphone },
  { label: "Web", icon: Globe },
];

const stages = [
  { label: "Entradas conectadas", detail: "mensagens e dados chegam de onde sua operação já acontece" },
  { label: "Dados processados", detail: "regras, integrações e IA organizam o que importa" },
  { label: "Tudo unificado", detail: "a informação aparece no formato ideal para o seu time" },
];

const LANE_TRUNK_OFFSET = 18;
const LANE_CORNER_RADIUS = 8;

type LanePoint = { x: number; y: number };

// Liga cada item ao card de IA com cantos arredondados, sem setas.
function lanePath(points: LanePoint[]) {
  let path = `M ${points[0].x} ${points[0].y}`;

  for (let index = 1; index < points.length - 1; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const next = points[index + 1];
    const inLength = Math.hypot(current.x - previous.x, current.y - previous.y) || 1;
    const outLength = Math.hypot(next.x - current.x, next.y - current.y) || 1;
    const radius = Math.min(LANE_CORNER_RADIUS, inLength / 2, outLength / 2);
    const inX = current.x - ((current.x - previous.x) / inLength) * radius;
    const inY = current.y - ((current.y - previous.y) / inLength) * radius;
    const outX = current.x + ((next.x - current.x) / outLength) * radius;
    const outY = current.y + ((next.y - current.y) / outLength) * radius;

    path += ` L ${inX} ${inY} Q ${current.x} ${current.y} ${outX} ${outY}`;
  }

  const last = points[points.length - 1];
  return `${path} L ${last.x} ${last.y}`;
}

export default function UnifiedFlowSection() {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStage((stage) => (stage + 1) % stages.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  const lanesRef = useRef<SVGSVGElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const sourceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const destinationRef = useRef<HTMLDivElement | null>(null);
  const [lanes, setLanes] = useState<{ inputs: string[]; outputs: string[] }>({ inputs: [], outputs: [] });
  const [activeDestination, setActiveDestination] = useState(0);
  const destination = destinations[activeDestination];
  const DestinationIcon = destination.icon;

  // A saída mostra um único formato por vez, trocando em loop.
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveDestination((index) => (index + 1) % destinations.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, []);

  // Mede a posição real dos itens para ligar as entradas e a saída ao card de IA.
  const measureLanes = () => {
    const lanesElement = lanesRef.current;
    const card = cardRef.current;
    if (!lanesElement || !card) return;

    const origin = lanesElement.getBoundingClientRect();
    if (!origin.width || !origin.height) return;

    const box = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      return {
        left: rect.left - origin.left,
        right: rect.right - origin.left,
        centerY: rect.top - origin.top + rect.height / 2,
      };
    };

    const cardBox = box(card);

    const inputs = sourceRefs.current
      .filter((node): node is HTMLDivElement => Boolean(node))
      .map((node) => {
        const nodeBox = box(node);
        const trunkX = nodeBox.right + LANE_TRUNK_OFFSET;
        return lanePath([
          { x: nodeBox.right, y: nodeBox.centerY },
          { x: trunkX, y: nodeBox.centerY },
          { x: trunkX, y: cardBox.centerY },
          { x: cardBox.left, y: cardBox.centerY },
        ]);
      });

    const outputs: string[] = [];
    const outputNode = destinationRef.current;

    if (outputNode) {
      const nodeBox = box(outputNode);
      const trunkX = nodeBox.left - LANE_TRUNK_OFFSET;
      outputs.push(
        lanePath([
          { x: cardBox.right, y: cardBox.centerY },
          { x: trunkX, y: cardBox.centerY },
          { x: trunkX, y: nodeBox.centerY },
          { x: nodeBox.left, y: nodeBox.centerY },
        ])
      );
    }

    setLanes({ inputs, outputs });
  };

  useEffect(() => {
    measureLanes();
    const handleResize = () => measureLanes();
    const frame = window.requestAnimationFrame(() => measureLanes());
    const observer = new ResizeObserver(() => measureLanes());
    if (lanesRef.current) observer.observe(lanesRef.current);
    if (cardRef.current) observer.observe(cardRef.current);
    window.addEventListener("resize", handleResize);
    if (document.fonts) document.fonts.ready.then(() => measureLanes()).catch(() => undefined);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Recalcula a ligação de saída sempre que o item exibido troca.
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => measureLanes());
    return () => window.cancelAnimationFrame(frame);
  }, [activeDestination]);

  return (
    <section className="unified-flow section-grid" id="unificacao" aria-label="Unificação de dados e ferramentas">
      <div className="unified-copy">
        <div className="section-kicker">/ tudo em um só fluxo</div>
        <h2>Informação espalhada vira <em>clareza.</em></h2>
        <p className="unified-lead">Depois da conversa, a Floow processa os dados com automações e inteligência artificial e entrega tudo organizado onde sua equipe realmente trabalha.</p>
        <div className="unified-choice"><Sparkles size={16} /><span>Escolha suas ferramentas ou a gente ajuda você a escolher o que for mais adequado.</span></div>
        <div className="unified-status" aria-live="polite"><span className="unified-status-dot" /> {stages[activeStage].label}<small>{stages[activeStage].detail}</small></div>
      </div>

      <div className="unified-visual" aria-label="Fluxo animado de integração entre canais, inteligência artificial e destinos">
        <svg className="unified-lanes" ref={lanesRef} aria-hidden="true">
          {lanes.inputs.map((path, index) => <path className="unified-lane" key={`lane-in-${index}`} d={path} />)}
          {lanes.outputs.map((path, index) => <path className="unified-lane" key={`lane-out-${index}`} d={path} />)}
          {lanes.inputs.map((path, index) => (
            <circle className="unified-lane-dot" r={4} key={`dot-in-${index}`}>
              <animateMotion path={path} dur={`${3.4 + index * 0.3}s`} begin={`${index * 0.55}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {lanes.outputs.map((path, index) => (
            <circle className="unified-lane-dot" r={4} key={`dot-out-${index}`}>
              <animateMotion path={path} dur="1.5s" begin={`${index * 0.4}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>
        <div className="unified-visual-head"><span>fluxo de dados</span><span><span className="pulse-dot" /> </span></div>
        <div className="unified-flow-grid">
          <div className={`unified-column unified-inputs ${activeStage >= 0 ? "is-active" : ""}`}>
            <span className="unified-column-label">receba de onde já acontece</span>
            <div className="unified-node-list">
              {sources.map(({ label, icon: Icon }, index) => <div className={`unified-node unified-source ${activeStage === 0 ? "is-flowing" : ""}`} style={{ "--node-delay": `${index * 90}ms` } as React.CSSProperties} key={label} ref={(element) => { sourceRefs.current[index] = element; }}><Icon size={15} /><span>{label}</span><i /></div>)}
            </div>
          </div>

          <div className={`unified-ai-card ${activeStage === 1 ? "is-processing" : ""}`} ref={cardRef}>
            <div className="unified-ai-icon"><BrainCircuit size={23} /></div>
            <span className="unified-ai-overline">floow intelligence</span>
            <strong>processa<br />e organiza</strong>
            <div className="unified-ai-lines"><i /><i /><i /></div>
            <span className="unified-ai-check"><Check size={11} /> pronto para usar</span>
          </div>

          <div className="unified-column unified-outputs">
            <span className="unified-column-label">entregue no formato ideal</span>
            <div className="unified-node-list">
              <div className="unified-node unified-destination is-ready" key={destination.label} ref={destinationRef}><DestinationIcon size={15} /><span>{destination.label}</span><i /></div>
            </div>
          </div>
        </div>
        <div className="unified-visual-foot"><Database size={13} /><span>uma fonte de verdade para o seu negócio</span><ChevronRight size={13} /></div>
        <div className="unified-orbit unified-orbit-a" /><div className="unified-orbit unified-orbit-b" />
      </div>
    </section>
  );
}
