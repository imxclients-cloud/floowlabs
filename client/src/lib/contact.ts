// Contato central da Floow Labs: todo CTA do site aponta para o WhatsApp abaixo.
export const WHATSAPP_PHONE = "5522992131811";
export const WHATSAPP_DISPLAY = "22 99213-1811";
export const WHATSAPP_MESSAGE = "Olá! Quero uma solução digital para minha empresa.";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const PRIVACY_POLICY_PATH = "/privacidade/politica-de-privacidade-e-cookies";

export const COOKIE_MANAGER_EVENT = "floow:open-cookie-manager";

export function openCookieManager() {
  window.dispatchEvent(new Event(COOKIE_MANAGER_EVENT));
}
