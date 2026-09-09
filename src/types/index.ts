export type Language =
  | "en"
  | "ur"
  | "ar"
  | "bn"
  | "fa"
  | "ru"
  | "zh"
  | "tr"
  | "ps"
  | "hi";

export type Theme = "light" | "dark";

export type SidebarMode =
  | "open"
  | "minimized"
  | "half"
  | "fullscreen"
  | "pip"
  | "floating";

export type SidebarSide = "left" | "right";

export interface SidebarState {
  mode: SidebarMode;
  visible: boolean;
}

export interface SubBrand {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  glowColor: string;
  bgGlass: string;
}

export interface LauncherTheme {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  accentColor: string;
  bgStyle: string;
  textStyle: string;
}

export interface AdminFeature {
  id: string;
  section: string;
  name: string;
  description: string;
  enabled: boolean;
  createdAt: string;
}

export interface AppContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  leftSidebar: SidebarState;
  rightSidebar: SidebarState;
  setLeftSidebar: (s: SidebarState) => void;
  setRightSidebar: (s: SidebarState) => void;
  isAdminAuthenticated: boolean;
  setAdminAuthenticated: (v: boolean) => void;
  activeLauncher: string;
  setActiveLauncher: (id: string) => void;
  adminFeatures: AdminFeature[];
  setAdminFeatures: (f: AdminFeature[]) => void;
}
