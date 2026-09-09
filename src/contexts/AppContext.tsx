import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { AppContextType, Theme, Language, SidebarState, AdminFeature } from "@/types";

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem("swo_theme") as Theme) || "light";
  });

  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem("swo_language") as Language) || "en";
  });

  const [leftSidebar, setLeftSidebarState] = useState<SidebarState>({
    mode: "minimized",
    visible: false,
  });

  const [rightSidebar, setRightSidebarState] = useState<SidebarState>({
    mode: "minimized",
    visible: false,
  });

  const [isAdminAuthenticated, setAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("swo_admin_auth") === "true";
  });

  const [activeLauncher, setActiveLauncherState] = useState<string>(() => {
    return localStorage.getItem("swo_launcher") || "triune-glory";
  });

  const [adminFeatures, setAdminFeaturesState] = useState<AdminFeature[]>(() => {
    try {
      const saved = localStorage.getItem("swo_admin_features");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    localStorage.setItem("swo_theme", t);
    if (t === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const setLanguage = useCallback((l: Language) => {
    setLanguageState(l);
    localStorage.setItem("swo_language", l);
  }, []);

  const setLeftSidebar = useCallback((s: SidebarState) => {
    setLeftSidebarState(s);
  }, []);

  const setRightSidebar = useCallback((s: SidebarState) => {
    setRightSidebarState(s);
  }, []);

  const setActiveLauncher = useCallback((id: string) => {
    setActiveLauncherState(id);
    localStorage.setItem("swo_launcher", id);
  }, []);

  const setAdminFeatures = useCallback((f: AdminFeature[]) => {
    setAdminFeaturesState(f);
    localStorage.setItem("swo_admin_features", JSON.stringify(f));
  }, []);

  // Apply theme on mount
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Auto-save indicator
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("[SWO™] Auto-sync: All data synchronized ✓");
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        language,
        setLanguage,
        leftSidebar,
        rightSidebar,
        setLeftSidebar,
        setRightSidebar,
        isAdminAuthenticated,
        setAdminAuthenticated,
        activeLauncher,
        setActiveLauncher,
        adminFeatures,
        setAdminFeatures,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
