import { ArrowLeft, ArrowRight } from "lucide-react";

import BrandMark from "@/components/BrandMark";
import SiteFooter from "@/components/SiteFooter";
import { WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/contact";
import { cookieCategories } from "@/lib/cookies";

type PrivacySection = {
  id: string;
  title: string;
  paragraphs?: string[];
  list?: string[];
};

const sections: PrivacySection[] = [
  {
    id: "quem-somos",
    title: "Quem somos",
    paragraphs: [
      "A Floow Labs cria landing pages, automações e integrações para empresas que querem transformar processos manuais em fluxos digitais simples. Esta política explica como tratamos as informações coletadas no site.",
      "Ao navegar por aqui você concorda com as práticas descritas abaixo. Se não concordar, recomendamos interromper o uso do site e entrar em contato com a gente.",
    ],
  },
  {
    id: "dados-coletados",
    title: "Quais dados coletamos",
    paragraphs: [
      "Coletamos apenas o necessário para entender o seu interesse e responder ao seu contato:",
    ],
    list: [
      "Dados enviados por você em canais de contato, como nome, empresa, e-mail e telefone.",
      "Informações de navegação, como páginas visitadas, tempo de permanência, tipo de dispositivo e navegador.",
      "Origem do acesso, incluindo campanhas e mecanismos de busca que trouxeram você até o site.",
    ],
  },
  {
    id: "uso-dos-dados",
    title: "Como usamos os dados",
    paragraphs: [
      "Utilizamos as informações para responder solicitações, apresentar soluções aderentes ao seu contexto, melhorar a experiência do site e mensurar o desempenho das nossas comunicações.",
      "Não vendemos nem alugamos seus dados. O tratamento é limitado às finalidades informadas nesta política e àquelas autorizadas por você.",
    ],
  },
  {
    id: "cookies",
    title: "Política de cookies",
    paragraphs: [
      "Cookies são pequenos arquivos gravados no seu dispositivo que ajudam o site a funcionar e a entender como você o utiliza. Trabalhamos com quatro categorias:",
    ],
  },
  {
    id: "gerenciar-cookies",
    title: "Como gerenciar os cookies",
    paragraphs: [
      "Você pode desativar os cookies em seu navegador. Para saber mais, consulte nossa Política de privacidade e cookies.",
      "Você também pode usar o botão Gerenciar cookies disponível no rodapé do site para revisar as categorias a qualquer momento. As configurações do seu navegador são sempre respeitadas por nós.",
    ],
  },
  {
    id: "compartilhamento",
    title: "Compartilhamento de dados",
    paragraphs: [
      "Podemos compartilhar dados com ferramentas que sustentam a operação do site e do atendimento, como serviços de hospedagem, analytics e mensageria. Todos os parceiros atuam sob contrato e seguem as regras de proteção de dados aplicáveis.",
    ],
  },
  {
    id: "direitos",
    title: "Seus direitos",
    paragraphs: [
      "Em conformidade com a Lei Geral de Proteção de Dados (LGPD), você pode solicitar a confirmação da existência de tratamento, o acesso, a correção, a anonimização, a portabilidade ou a exclusão dos seus dados, além de revogar um consentimento dado anteriormente.",
    ],
  },
  {
    id: "seguranca",
    title: "Segurança e retenção",
    paragraphs: [
      "Adotamos medidas técnicas e organizacionais para proteger as informações contra acessos não autorizados. Mantemos os dados apenas pelo tempo necessário para cumprir as finalidades desta política ou obrigações legais.",
    ],
  },
  {
    id: "alteracoes",
    title: "Alterações nesta política",
    paragraphs: [
      "Esta política pode ser atualizada para refletir mudanças na legislação ou nos nossos serviços. A versão vigente é sempre a publicada nesta página.",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="nav-wrap">
          <a href="/" className="logo-link">
            <BrandMark />
          </a>
          <a className="privacy-back" href="/">
            <ArrowLeft size={15} /> Voltar para o site
          </a>
        </div>
      </header>

      <main className="privacy-page">
        <div className="privacy-head">
          <div className="section-kicker">/ privacidade</div>
          <h1>Política de privacidade e cookies</h1>
          <p className="privacy-lead">
            Transparência sobre quais informações coletamos, por que coletamos e como você pode
            controlar o uso de cookies enquanto navega pelo site da Floow Labs.
          </p>
          <span className="privacy-updated">Última atualização: setembro de 2026</span>
        </div>

        <div className="privacy-body">
          {sections.map(({ id, title, paragraphs, list }) => (
            <section className="privacy-section" id={id} key={id}>
              <h2>{title}</h2>
              {paragraphs?.map((text) => <p key={text}>{text}</p>)}
              {list && (
                <ul>
                  {list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {id === "cookies" && (
                <div className="privacy-cookies">
                  {cookieCategories.map(({ title: category, text }) => (
                    <div key={category}>
                      <strong>{category}</strong>
                      <p>{text}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}

          <section className="privacy-section" id="contato">
            <h2>Fale com a gente</h2>
            <p>
              Dúvidas sobre privacidade e cookies? Fale com o nosso time no WhatsApp pelo número{" "}
              {WHATSAPP_DISPLAY}.
            </p>
            <a
              className="light-button privacy-cta"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar no WhatsApp <ArrowRight size={18} />
            </a>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

