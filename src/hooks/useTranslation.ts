import { useApp } from "@/contexts/AppContext";
import { TRANSLATIONS, LANGUAGES } from "@/constants";
import type { Language } from "@/types";

export const useTranslation = () => {
  const { language } = useApp();

  const t = (key: string): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS["en"];
    return dict[key] || TRANSLATIONS["en"][key] || key;
  };

  const getLangInfo = (code: Language) => {
    return LANGUAGES.find((l) => l.code === code);
  };

  const currentLangInfo = getLangInfo(language);
  const isRTL = currentLangInfo?.dir === "rtl";

  return { t, language, isRTL, currentLangInfo, getLangInfo };
};
