import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bot,
  CalendarDays,
  CheckCheck,
  ChevronLeft,
  Clock3,
  ExternalLink,
  FileText,
  Link2,
  MoreVertical,
  Paperclip,
  Pause,
  Play,
  ReceiptText,
  RefreshCw,
  Send,
  Smile,
  WalletCards,
} from "lucide-react";

const logoUrl = "/manus-storage/floow-logo-green-outline_4de514d4.png";

type WhatsAppMessage = {
  id: string;
  sender: "Alice" | "Assistente";
  time: string;
  kind: "text" | "calendar" | "finance" | "expense" | "link" | "recipe";
  text: string;
  detail?: string;
  footer?: string;
};

const messages: WhatsAppMessage[] = [
  {
    id: "agenda-question",
    sender: "Alice",
    time: "08:27",
    kind: "text",
    text: "Tenho algum evento na agenda marcado para hoje?",
  },
  {
    id: "agenda-answer",
    sender: "Assistente",
    time: "08:27",
    kind: "calendar",
    text: "Você tem um evento marcado para hoje na agenda:",
    detail: "Reunião de alinhamento técnico\n16:30 às 17:15",
    footer: "Precisa que eu verifique algo mais sobre essa agenda ou deseja ajuda com outra coisa?",
  },
  {
    id: "expense",
    sender: "Alice",
    time: "08:28",
    kind: "text",
    text: "Gastei 150 reais no mercado hoje",
  },
  {
    id: "income",
    sender: "Alice",
    time: "08:28",
    kind: "text",
    text: "recebi 500 reais de um freela",
  },
  {
    id: "finance-answer",
    sender: "Assistente",
    time: "08:28",
    kind: "finance",
    text: "Despesa registrada: R$ 150,00 no mercado (Alimentação)",
    detail: "Receita registrada: R$ 500,00 de freela (Freelance)",
    footer: "Se precisar de mais alguma coisa, é só avisar! 😊",
  },
  {
    id: "mechanic",
    sender: "Alice",
    time: "08:29",
    kind: "text",
    text: "fui ao mecanico hoje e trocaram o oleo de motor e colocaram uma nova lampada de farol dianteiro esquerdo e direito. custou 50 reais a troca de oleo e as lampadas foram 30 reias das duas e mao de obra 50 reais paguei no pix",
  },
  {
    id: "mechanic-answer",
    sender: "Assistente",
    time: "08:29",
    kind: "expense",
    text: "Despesa registrada: R$ 130,00 na troca de óleo e lâmpadas do farol (Transporte)",
    footer: "Se precisar de mais alguma coisa, é só avisar! 😊",
  },
  {
    id: "recipe-link",
    sender: "Alice",
    time: "08:30",
    kind: "link",
    text: "https://www.tudogostoso.com.br/receita/31593-pudim-de-leite-condensado.html",
  },
  {
    id: "recipe-answer",
    sender: "Assistente",
    time: "08:30",
    kind: "recipe",
    text: "Receita salva: Pudim de leite condensado",
    detail: "Sobremesas",
  },
];

function MessageBody({ message }: { message: WhatsAppMessage }) {
  const isLink = message.kind === "link";

  return (
    <>
      <p className={isLink ? "wa-link-text" : ""}>{message.text}</p>
      {message.kind === "calendar" && (
        <div className="wa-card-detail wa-calendar-detail">
          <span>{message.detail?.split("\n")[0]}</span>
          <strong><Clock3 size={12} /> {message.detail?.split("\n")[1]}</strong>
        </div>
      )}
      {message.kind === "finance" && (
        <div className="wa-card-detail wa-finance-detail">
          <span>✓ {message.detail}</span>
        </div>
      )}
      {message.kind === "expense" && (
        <div className="wa-card-detail wa-finance-detail">
          <span>Pagamento via Pix · Transporte</span>
        </div>
      )}
      {message.kind === "recipe" && (
        <div className="wa-link-preview">
          <div className="wa-link-preview-icon"><FileText size={17} /></div>
          <div>
            <strong>{message.detail}</strong>
            <span>tudogostoso.com.br</span>
          </div>
          <ExternalLink size={14} />
        </div>
      )}
      {message.footer && <p className="wa-footer-copy">{message.footer}</p>}
    </>
  );
}

export default function WhatsAppDemo() {
  const [visibleCount, setVisibleCount] = useState(2);
  const [isPlaying, setIsPlaying] = useState(true);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const isComplete = visibleCount >= messages.length;
  const visibleMessages = useMemo(() => messages.slice(0, visibleCount), [visibleCount]);

  useEffect(() => {
    if (!isPlaying || isComplete) return;

    const timer = window.setTimeout(() => {
      setVisibleCount((count) => Math.min(count + 1, messages.length));
    }, 1550);

    return () => window.clearTimeout(timer);
  }, [isPlaying, isComplete, visibleCount]);

  useEffect(() => {
    const chatBody = chatBodyRef.current;
    if (!chatBody) return;
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
  }, [visibleCount]);

  const replay = () => {
    setVisibleCount(1);
    setIsPlaying(true);
  };

  return (
    <section className="whatsapp-demo section-grid" id="demo" aria-label="Demonstração de automação via WhatsApp">
      <div className="whatsapp-demo-copy">
        <div className="section-kicker">/ automação em ação</div>
        <p className="demo-index">Uma conversa. Vários processos resolvidos.</p>
        <h2>Seu WhatsApp pode fazer <em>muito mais.</em></h2>
        <p className="demo-lead">Sem trocar de ferramenta, sem planilhas esquecidas e sem operação manual. A Floow conecta a conversa ao que precisa acontecer.</p>
        <div className="demo-points">
          <div><span><CalendarDays size={15} /></span><p><strong>Agenda</strong> identifica compromissos e horários em segundos.</p></div>
          <div><span><WalletCards size={15} /></span><p><strong>Financeiro</strong> registra despesas e receitas sem digitação.</p></div>
          <div><span><ReceiptText size={15} /></span><p><strong>Processos</strong> transformam mensagens em tarefas concluídas.</p></div>
        </div>
        <div className="demo-actions">
          <button className="demo-control" onClick={() => setIsPlaying((playing) => !playing)} aria-label={isPlaying ? "Pausar animação" : "Continuar animação"}>
            {isPlaying ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
            {isPlaying ? "Pausar demonstração" : "Continuar demonstração"}
          </button>
          <button className="demo-replay" onClick={replay} aria-label="Reiniciar demonstração"><RefreshCw size={14} /> Reiniciar</button>
        </div>
      </div>

      <div className="wa-stage">
        <div className="wa-stage-note"><span className="pulse-dot" /> conectado ao fluxo Floow</div>
        <div className="wa-phone-shell">
          <div className="wa-phone-topbar">
            <div className="wa-contact">
              <button className="wa-back" aria-label="Voltar"><ChevronLeft size={20} /></button>
              <div className="wa-avatar"><img src={logoUrl} alt="" /><span className="wa-online" /></div>
              <div><strong>Assistente Floow</strong><span>online agora</span></div>
            </div>
            <div className="wa-top-actions"><button aria-label="Anexar arquivo"><Paperclip size={17} /></button><button aria-label="Mais opções"><MoreVertical size={18} /></button></div>
          </div>
          <div className="wa-date-chip">18 DE SETEMBRO DE 2026</div>
          <div className="wa-chat-body" ref={chatBodyRef}>
            <div className="wa-encryption-note"><span>🔒</span> As mensagens são protegidas com criptografia de ponta a ponta.</div>
            {visibleMessages.map((message) => {
              const isBot = message.sender === "Assistente";
              return (
                <div className={`wa-message-row ${isBot ? "is-bot" : "is-user"}`} key={message.id}>
                  <div className={`wa-bubble wa-${message.kind}`}>
                    <MessageBody message={message} />
                    <span className="wa-time">{message.time} {isBot && <CheckCheck size={12} />}</span>
                  </div>
                </div>
              );
            })}
            {!isComplete && isPlaying && <div className="wa-typing"><span /><span /><span /></div>}
            {isComplete && <div className="wa-complete-note"><Bot size={13} /> fluxo concluído automaticamente</div>}
          </div>
          <div className="wa-composer">
            <div className="wa-composer-input"><Smile size={17} /><span>Digite uma mensagem</span></div>
            <button aria-label="Enviar mensagem"><Send size={16} fill="currentColor" /></button>
          </div>
        </div>
        <div className="wa-float-card wa-float-one"><Link2 size={15} /><span>WhatsApp → agenda → financeiro</span></div>
        <div className="wa-float-card wa-float-two"><CheckCheck size={15} /><span>sem código para você</span></div>
      </div>
    </section>
  );
}
