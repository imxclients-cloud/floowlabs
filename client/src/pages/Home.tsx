import { useState } from "react";
import {
  ArrowRight,
  Bot,
  Check,
  ChevronDown,
  Clock3,
  Command,
  Layers3,
  Menu,
  Moon,
  Network,
  Play,
  Sparkles,
  Sun,
  X,
  Zap,
} from "lucide-react";
import WhatsAppDemo from "@/components/WhatsAppDemo";
import UnifiedFlowSection from "@/components/UnifiedFlowSection";

const logoUrl = "/manus-storage/floow-logo-green-outline_4de514d4.png";

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand-mark ${compact ? "brand-mark-compact" : ""}`} aria-label="Floow Labs">
      <span>fl</span>
      <img src={logoUrl} alt="" />
      <span>w</span>
      {!compact && <small>labs</small>}
    </div>
  );
}

const capabilities = [
  {
    number: "01",
    icon: Network,
    title: "Conectamos o que já funciona",
    text: "Integramos suas ferramentas atuais para que dados e tarefas fluam sem retrabalho.",
  },
  {
    number: "02",
    icon: Bot,
    title: "Automatizamos o repetitivo",
    text: "Atendimento, follow-ups, agendamentos e processos internos rodando no piloto automático.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Devolvemos tempo ao time",
    text: "Menos operação manual. Mais energia para vender, criar e fazer o negócio crescer.",
  },
];

const faqs = [
  ["Preciso trocar as ferramentas que já uso?", "Não. Partimos do seu processo atual e conectamos as ferramentas que já fazem sentido para a operação."],
  ["A Floow Labs atende empresas de qualquer tamanho?", "Sim. Criamos soluções sob medida, desde uma automação pontual até uma operação digital completa."],
  ["Preciso saber programar?", "De jeito nenhum. Você explica o problema; nós desenhamos, construímos e colocamos a solução para funcionar."],
];

export default function Home() {
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollToContact = () => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className={dark ? "site-shell dark-mode" : "site-shell"}>
      <header className="topbar">
        <div className="nav-wrap">
          <a href="#top" className="logo-link"><BrandMark /></a>
          <nav className={mobileOpen ? "main-nav mobile-visible" : "main-nav"}>
            <a href="#como-funciona" onClick={() => setMobileOpen(false)}>Como funciona</a>
            <a href="#demo" onClick={() => setMobileOpen(false)}>Demo</a>
            <a href="#unificacao" onClick={() => setMobileOpen(false)}>Unificação</a>
            <a href="#solucoes" onClick={() => setMobileOpen(false)}>Soluções</a>
            <a href="#contato" onClick={() => setMobileOpen(false)}>Contato</a>
            <button className="mobile-cta" onClick={() => { setMobileOpen(false); scrollToContact(); }}>Falar com a Floow <ArrowRight size={16} /></button>
          </nav>
          <div className="nav-actions">
            <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Alternar tema">
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button className="nav-cta" onClick={scrollToContact}>Falar com a Floow <ArrowRight size={16} /></button>
            <button className="menu-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Abrir menu">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero section-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="pulse-dot" /> Design, tecnologia & IA</div>
            <h1>Ideias que <em>fluem.</em><br />Negócios que avançam.</h1>
            <p className="hero-lead">Criamos experiências digitais e automações inteligentes para transformar problemas reais em mais tempo para o que importa.</p>
            <div className="hero-actions">
              <button className="primary-button" onClick={scrollToContact}>Quero simplificar minha operação <ArrowRight size={18} /></button>
              <a className="play-link" href="#como-funciona"><span className="play-icon"><Play size={13} fill="currentColor" /></span> Entenda em 60 segundos</a>
            </div>
            <div className="hero-proof"><div className="avatar-stack"><span>F</span><span>L</span><span>+</span></div><span>Feito para times que querem<br /><strong>fazer mais com menos.</strong></span></div>
          </div>
          <div className="hero-visual" aria-label="Visualização de automação conectando ferramentas">
            <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" />
            <div className="visual-card card-main"><div className="card-topline"><span className="status-pill"><span /> fluxo ativo</span><span className="card-time">agora</span></div><div className="flow-title">Seu processo,<br /><strong>sem gargalos.</strong></div><div className="flow-track"><span className="flow-node active"><Zap size={17} /></span><span className="flow-line" /><span className="flow-node"><Command size={17} /></span><span className="flow-line" /><span className="flow-node"><Check size={17} /></span></div><div className="flow-caption"><span>Entrada</span><span>Automação</span><span>Resultado</span></div></div>
            <div className="floating-card floating-top"><div className="mini-icon"><Clock3 size={15} /></div><div><span>tempo recuperado</span><strong>+ 18h / mês</strong></div></div>
            <div className="floating-card floating-bottom"><div className="mini-icon green"><Sparkles size={15} /></div><div><span>operação</span><strong>mais leve</strong></div><span className="trend">↗</span></div>
            <div className="visual-label">FLOOW / SYSTEMS <span>✳</span></div>
          </div>
        </section>

        <WhatsAppDemo />
        <UnifiedFlowSection />

        <section className="logo-strip"><span>Construímos com as ferramentas que você já usa</span><div className="tool-logos"><b>✦ notion</b><b>◉ WhatsApp</b><b>◌ google</b><b>◈ hubspot</b><b>↗ RD Station</b></div></section>

        <section className="manifesto section-grid" id="como-funciona">
          <div className="section-kicker">/ o que fazemos</div>
          <div className="manifesto-copy"><h2>Chegamos para transformar <span>ideias em experiências digitais.</span></h2><p>Somos a Floow Labs, uma agência que une design, tecnologia e inteligência artificial para criar soluções que fazem sentido para o seu negócio.</p><p>Conectamos as ferramentas que sua empresa já usa e criamos automações inteligentes para cuidar das tarefas que consomem tempo todos os dias.</p></div>
        </section>

        <section className="capabilities" id="solucoes"><div className="section-grid capabilities-head"><div className="section-kicker">/ por onde começamos</div><div><h2>Menos trabalho manual.<br /><span>Mais tempo para o que importa.</span></h2></div></div><div className="capability-grid">{capabilities.map(({ number, icon: Icon, title, text }) => <article className="capability-card" key={number}><div className="capability-top"><span>{number}</span><Icon size={21} /></div><h3>{title}</h3><p>{text}</p><a href="#contato">Quero isso <ArrowRight size={15} /></a></article>)}</div></section>

        <section className="process-section"><div className="process-intro"><div className="section-kicker">/ o jeito floow</div><h2>Você traz o desafio.<br /><em>A gente faz fluir.</em></h2><p>Sem tecnicês, sem processos intermináveis e sem você precisar virar especialista em programação.</p></div><div className="process-list"><div className="process-item"><span>01</span><div><h3>Entendemos o processo</h3><p>Mergulhamos na sua rotina para encontrar onde o tempo está escapando.</p></div></div><div className="process-item"><span>02</span><div><h3>Desenhamos a solução</h3><p>Transformamos a complexidade em um fluxo simples, claro e possível.</p></div></div><div className="process-item"><span>03</span><div><h3>Fazemos acontecer</h3><p>Construímos, conectamos e deixamos tudo funcionando para você.</p></div></div></div></section>

        <section className="faq-section"><div className="section-kicker">/ perguntas frequentes</div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? "is-open" : ""}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{question}</span><ChevronDown size={18} /></button><div className="faq-answer"><p>{answer}</p></div></div>)}</div></section>

        <section className="contact-section" id="contato"><div className="contact-glow" /><div className="section-kicker">/ vamos conversar</div><h2>Seu próximo ganho de tempo<br /><em>começa aqui.</em></h2><p>Conte pra gente o que está travando sua operação.<br />A primeira conversa é por nossa conta.</p><button className="light-button" onClick={() => window.location.href = "mailto:oi@floowlabs.com?subject=Quero falar com a Floow Labs"}>Falar com a Floow Labs <ArrowRight size={18} /></button><span className="contact-note">Resposta em até 1 dia útil · sem compromisso</span></section>
      </main>

      <footer className="footer"><div className="footer-brand"><BrandMark /><p>Tecnologia trabalhando<br />para o seu negócio.</p></div><div className="footer-links"><div><span>explore</span><a href="#como-funciona">Como funciona</a><a href="#solucoes">Soluções</a><a href="#contato">Contato</a></div><div><span>social</span><a href="#contato">Instagram</a><a href="#contato">LinkedIn</a></div></div><div className="footer-bottom"><span>© 2026 Floow Labs</span><span>Feito para fazer fluir. <Sparkles size={14} /></span></div></footer>
    </div>
  );
}
