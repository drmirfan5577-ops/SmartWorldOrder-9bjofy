import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { useTranslation } from "@/hooks/useTranslation";
import { LANGUAGES } from "@/constants";
import type { Language } from "@/types";
import {
  Sun,
  Moon,
  Globe,
  Shield,
  ChevronDown,
  Zap,
} from "lucide-react";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { theme, setTheme, language, setLanguage } = useApp();
  const { t, isRTL } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 glass-white tube-glow-surface"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Live Ticker Bar */}
      <div className="bg-gradient-to-r from-emerald-700 via-yellow-600 to-red-700 text-white text-xs py-1 overflow-hidden">
        <div className="flex">
          <span className="animate-marquee whitespace-nowrap inline-block font-body font-semibold tracking-widest">
            ★ SMART WORLD ORDER™ &nbsp;|&nbsp; ESOneWorld™ &nbsp;|&nbsp; UniFeel™ &nbsp;|&nbsp;
            UniEdge™ &nbsp;|&nbsp; UniNews™ &nbsp;|&nbsp; UniSpark™ &nbsp;|&nbsp; UniMail™
            &nbsp;|&nbsp; UniHost™ &nbsp;|&nbsp; @uniorbi.com™ &nbsp;|&nbsp; Dr M Irfan Qadir
            Thaheem &nbsp;|&nbsp; A Global Family Platform Vision &nbsp;★
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 md:px-6 py-3 max-w-[1600px] mx-auto">
        {/* Logo + Brand */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 group"
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500 via-yellow-400 to-red-500 opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
            <Zap
              className="w-6 h-6 relative z-10"
              style={{ color: "#007a4a", filter: "drop-shadow(0 0 6px #00c97a)" }}
            />
          </div>
          <div className="hidden sm:block">
            <div className="text-gradient-emerald font-heading font-bold text-lg leading-none tracking-tight">
              SWO™
            </div>
            <div className="text-[10px] font-body text-gray-500 tracking-widest uppercase">
              ESOneWorld™
            </div>
          </div>
        </button>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { label: t("sub_brands"), path: "/#brands" },
            { label: t("launchers"), path: "/#launchers" },
            { label: t("about"), path: "/legal" },
            { label: t("legal"), path: "/legal" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="px-3 py-2 text-sm font-body font-medium text-gray-700 hover:text-emerald-700 rounded-lg hover:bg-emerald-50 transition-all duration-200"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-body font-medium text-gray-700 hover:text-emerald-700 rounded-lg hover:bg-emerald-50 transition-all duration-200 border border-transparent hover:border-emerald-200"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">
                {LANGUAGES.find((l) => l.code === language)?.native || "EN"}
              </span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 glass-white rounded-xl shadow-xl border border-emerald-100 overflow-hidden z-50 animate-slide-in-right">
                <div className="p-2 max-h-72 overflow-y-auto">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as Language);
                        setLangOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-body transition-all duration-200 ${
                        language === lang.code
                          ? "bg-emerald-100 text-emerald-800 font-semibold"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span>{lang.label}</span>
                      <span
                        className="text-base"
                        style={{
                          fontFamily:
                            lang.dir === "rtl"
                              ? "'Noto Nastaliq Urdu', serif"
                              : "inherit",
                          direction: lang.dir,
                        }}
                      >
                        {lang.native}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-50 to-yellow-50 hover:from-emerald-100 hover:to-yellow-100 border border-emerald-200 transition-all duration-200"
            title={theme === "light" ? t("theme_dark") : t("theme_light")}
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4 text-indigo-600" />
            ) : (
              <Sun className="w-4 h-4 text-yellow-600" />
            )}
          </button>

          {/* Admin Button */}
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-body font-semibold bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-lg shadow-md hover:shadow-emerald-200 transition-all duration-200"
            style={{ boxShadow: "0 2px 12px rgba(0,201,122,0.3)" }}
          >
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">{t("admin_panel")}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
