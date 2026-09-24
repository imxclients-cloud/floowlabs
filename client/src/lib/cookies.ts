export type CookieCategory = {
  id: string;
  title: string;
  text: string;
};

export const cookieCategories: CookieCategory[] = [
  {
    id: "essenciais",
    title: "Cookies Essenciais",
    text: "Necessários para as funções básicas do site, permitindo que este opere corretamente.",
  },
  {
    id: "funcionalidade",
    title: "Cookies de Funcionalidade",
    text: "Possibilitam melhor desempenho dos serviços solicitados e lembram preferências do site.",
  },
  {
    id: "publicidade",
    title: "Cookies de Publicidade",
    text: "Personalizam anúncios conforme sua experiência de navegação.",
  },
  {
    id: "analiticos",
    title: "Cookies Analíticos",
    text: "Coletam dados e informações de uso do site, para melhorar seu funcionamento.",
  },
];

export type CookiePreferences = Record<string, boolean>;

const STORAGE_KEY = "floow-cookie-preferences";

const defaultPreferences = cookieCategories.reduce<CookiePreferences>((accumulator, { id }) => {
  accumulator[id] = true;
  return accumulator;
}, {});

export function readCookiePreferences(): CookiePreferences {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored
      ? { ...defaultPreferences, ...(JSON.parse(stored) as CookiePreferences) }
      : { ...defaultPreferences };
  } catch {
    return { ...defaultPreferences };
  }
}

export function saveCookiePreferences(preferences: CookiePreferences) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch {
    // armazenamento indisponível: mantemos apenas o estado em memória
  }
}

