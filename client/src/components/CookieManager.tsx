import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";

import { COOKIE_MANAGER_EVENT, PRIVACY_POLICY_PATH } from "@/lib/contact";
import {
  cookieCategories,
  readCookiePreferences,
  saveCookiePreferences,
  type CookiePreferences,
} from "@/lib/cookies";

export default function CookieManager() {
  const [open, setOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(() => readCookiePreferences());

  useEffect(() => {
    const handleOpen = () => {
      setPreferences(readCookiePreferences());
      setOpen(true);
    };

    window.addEventListener(COOKIE_MANAGER_EVENT, handleOpen);
    return () => window.removeEventListener(COOKIE_MANAGER_EVENT, handleOpen);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const openModal = () => {
    setPreferences(readCookiePreferences());
    setOpen(true);
  };

  const toggleCategory = (id: string) => {
    setPreferences((current) => ({ ...current, [id]: !current[id] }));
  };

  const acceptAll = () => {
    const allEnabled = cookieCategories.reduce<CookiePreferences>((accumulator, { id }) => {
      accumulator[id] = true;
      return accumulator;
    }, {});

    setPreferences(allEnabled);
    saveCookiePreferences(allEnabled);
    setOpen(false);
  };

  const savePreferences = () => {
    saveCookiePreferences(preferences);
    setOpen(false);
  };

  return (
    <>
      <div className={open ? "cookie-manager is-open" : "cookie-manager"}>
        <button
          className="cookie-manager-tab"
          type="button"
          onClick={openModal}
          aria-label="Gerenciar cookies"
          aria-haspopup="dialog"
        >
          <span className="cookie-manager-label">Gerenciar cookies</span>
          <span className="cookie-manager-icon"><Cookie size={19} /></span>
        </button>
      </div>

      {open && (
        <div className="cookie-overlay" onClick={() => setOpen(false)}>
          <div
            className="cookie-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="cookie-modal-close" type="button" onClick={() => setOpen(false)} aria-label="Fechar">
              <X size={17} />
            </button>
            <h2 className="cookie-modal-title" id="cookie-modal-title">Gerenciar cookies</h2>
            <p className="cookie-modal-lead">
              Escolha quais categorias de cookies você autoriza enquanto navega neste site.
            </p>
            <ul className="cookie-modal-list">
              {cookieCategories.map(({ id, title, text }) => (
                <li key={id}>
                  <div className="cookie-modal-row">
                    <strong>{title}</strong>
                    <button
                      className={preferences[id] ? "cookie-switch is-on" : "cookie-switch"}
                      type="button"
                      role="switch"
                      aria-checked={Boolean(preferences[id])}
                      aria-label={`${preferences[id] ? "Desativar" : "Ativar"} ${title}`}
                      onClick={() => toggleCategory(id)}
                    >
                      <span />
                    </button>
                  </div>
                  <p className="cookie-modal-text">{text}</p>
                </li>
              ))}
            </ul>
            <p className="cookie-modal-note">
              Você pode desativar os cookies em seu navegador. Para saber mais, consulte nossa{" "}
              <a href={PRIVACY_POLICY_PATH}>Política de privacidade e cookies</a>.
            </p>
            <div className="cookie-modal-actions">
              <button className="cookie-modal-accept" type="button" onClick={acceptAll}>Aceitar todos</button>
              <button className="cookie-modal-save" type="button" onClick={savePreferences}>Salvar preferências</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
