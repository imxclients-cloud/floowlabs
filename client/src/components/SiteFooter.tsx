import { MessageCircle, Sparkles } from "lucide-react";

import BrandMark from "@/components/BrandMark";
import {
  PRIVACY_POLICY_PATH,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
  openCookieManager,
} from "@/lib/contact";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <BrandMark />
        <p>
          Tecnologia trabalhando
          <br />
          para o seu negócio.
        </p>
      </div>
      <div className="footer-links">
        <div>
          <span>explore</span>
          <a href="/#solucoes">Soluções</a>
          <a href="/#unificacao">Unificação</a>
          <a href="/#demo">Demo</a>
          <a href="/#como-funciona">Como funciona</a>
          <a href="/#faq">Perguntas frequentes</a>
        </div>
        <div>
          <span>Contato</span>
          <a className="footer-whats" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={14} /> {WHATSAPP_DISPLAY}
          </a>
          <a className="footer-whats" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            Falar no WhatsApp
          </a>
        </div>
        <div>
          <span>Acompanhe</span>
          <a href="https://www.instagram.com/floow.labs" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href="https://www.youtube.com/@Floowlabs" target="_blank" rel="noopener noreferrer">
            Youtube
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Floow Labs</span>
        <div className="footer-legal">
          <button className="footer-cookie-link" type="button" onClick={openCookieManager}>
            Gerenciar cookies
          </button>
          <a href={PRIVACY_POLICY_PATH}>Política de privacidade e cookies</a>
        </div>
        <span>
          Feito para fazer fluir. <Sparkles size={14} />
        </span>
      </div>
    </footer>
  );
}
