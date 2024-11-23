import { createContext, ReactNode, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

interface LanguageContextProps {
  t: (key: string) => string;
  toggleLanguage: (lang: string) => void;
}

export const LanguageContext = createContext<LanguageContextProps>({
  t: (key: string) => key,
  toggleLanguage: () => {},
});

interface LanguageProviderProps {
  children: ReactNode;
}

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const ltrLangs = ["en"];
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";
    if (savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
      document.dir = ltrLangs.includes(savedLang) ? "ltr" : "rtl";
    }
  }, [i18n.language, ltrLangs]);

  const contextValue = useMemo(
    () => ({
      t,
      toggleLanguage: (lang: string) => {
        localStorage.setItem("lang", lang);
        i18n.changeLanguage(lang);
        document.dir = ltrLangs.includes(lang) ? "ltr" : "rtl";
      },
    }),
    [t, i18n]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
