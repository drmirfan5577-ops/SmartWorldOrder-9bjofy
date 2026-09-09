import React, { useState, useRef } from "react";
import { useApp } from "@/contexts/AppContext";
import { useTranslation } from "@/hooks/useTranslation";
import { SUB_BRANDS } from "@/constants";
import {
  Minimize2,
  Maximize2,
  PictureInPicture,
  X,
  Layers,
  Palette,
  Settings,
  Globe,
  Star,
  ChevronRight,
  Layout,
} from "lucide-react";

type PanelMode = "open" | "minimized" | "pip" | "half" | "fullscreen" | "floating";

const LeftSidebar: React.FC = () => {
  const { theme } = useApp();
  const { t } = useTranslation();
  const [mode, setMode] = useState<PanelMode>("minimized");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"brands" | "settings" | "themes">("brands");
  const pipRef = useRef<HTMLDivElement>(null);
  const [pipPos, setPipPos] = useState({ x: 20, y: 200 });
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleStarClick = () => {
    setMenuOpen(!menuOpen);
  };

  const applyMode = (m: PanelMode) => {
    setMode(m);
    setMenuOpen(false);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (mode !== "floating" && mode !== "pip") return;
    isDragging.current = true;
    dragOffset.current = {
      x: e.clientX - pipPos.x,
      y: e.clientY - pipPos.y,
    };
    const onMove = (ev: MouseEvent) => {
      if (!isDragging.current) return;
      setPipPos({ x: ev.clientX - dragOffset.current.x, y: ev.clientY - dragOffset.current.y });
    };
    const onUp = () => {
      isDragging.current = false;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const isHidden = mode === "minimized";
  const isFloating = mode === "floating" || mode === "pip";
  const isFullscreen = mode === "fullscreen";
  const isHalf = mode === "half";

  const panelWidth = isFullscreen ? "w-screen" : isHalf ? "w-[50vw]" : "w-72";
  const panelHeight = isFullscreen ? "h-screen" : "h-[80vh]";

  const panelContent = (
    <div
      className={`glass-emerald rounded-2xl overflow-hidden flex flex-col ${
        isFloating ? "" : "h-full"
      } ${isFullscreen ? "rounded-none" : ""}`}
      style={{ height: isFloating ? "min(500px, 80vh)" : undefined }}
    >
      {/* Panel Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-emerald-200/60 bg-gradient-to-r from-emerald-50 to-white">
        <div className="flex items-center gap-2">
          <Layout className="w-4 h-4 text-emerald-700" />
          <span className="text-sm font-heading font-semibold text-emerald-800">
            {t("left_panel")}
          </span>
        </div>
        <button
          onClick={() => setMode("minimized")}
          className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-100 text-gray-400 hover:text-red-600 transition-all"
        >
          <X className="w-3 h-3" />
        </button>
      </div>

      {/* Tab Bar */}
      <div className="flex border-b border-emerald-100">
        {(["brands", "settings", "themes"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-xs font-body font-medium capitalize transition-all ${
              activeTab === tab
                ? "text-emerald-700 border-b-2 border-emerald-500 bg-emerald-50"
                : "text-gray-500 hover:text-emerald-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {activeTab === "brands" && (
          <>
            {SUB_BRANDS.map((brand) => (
              <div
                key={brand.id}
                className="flex items-center gap-3 p-3 rounded-xl glass-white hover:bg-emerald-50 transition-all duration-200 cursor-pointer group"
              >
                <span className="text-xl">{brand.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-heading font-semibold text-gray-800 group-hover:text-emerald-700 truncate">
                    {brand.name}
                  </div>
                  <div className="text-xs text-gray-500 truncate">{brand.tagline}</div>
                </div>
                <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-emerald-500 transition-all" />
              </div>
            ))}
          </>
        )}

        {activeTab === "settings" && (
          <div className="space-y-3">
            {[
              { icon: Globe, label: t("language"), sub: "10 languages" },
              { icon: Palette, label: "Theme", sub: "Light / Dark" },
              { icon: Settings, label: t("features"), sub: "Configure" },
              { icon: Layers, label: t("launchers"), sub: "8 themes" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 p-3 rounded-xl glass-white hover:bg-emerald-50 cursor-pointer group transition-all"
              >
                <item.icon className="w-4 h-4 text-emerald-600 group-hover:text-emerald-800" />
                <div>
                  <div className="text-sm font-body font-medium text-gray-800">{item.label}</div>
                  <div className="text-xs text-gray-500">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "themes" && (
          <div className="space-y-2">
            {["Emerald Crystal", "Crimson Flame", "Royal Gold", "Cosmic Prism", "Triune Glory™"].map(
              (name) => (
                <div
                  key={name}
                  className="p-3 rounded-xl glass-white hover:bg-emerald-50 cursor-pointer text-sm font-body font-medium text-gray-700 hover:text-emerald-700 transition-all"
                >
                  {name}
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* Auto-Save Indicator */}
      <div className="px-4 py-2 bg-emerald-50 border-t border-emerald-100 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs text-emerald-700 font-body">{t("saved")} · {t("synced")}</span>
      </div>
    </div>
  );

  return (
    <>
      {/* Star Toggle Button */}
      <div className="fixed top-16 left-3 z-50">
        <button
          onClick={handleStarClick}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-lg border border-yellow-300 hover:border-yellow-500 transition-all duration-200"
          style={{ animation: "star-pulse 2s ease-in-out infinite" }}
          title={t("left_panel")}
        >
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-500" />
        </button>

        {/* Mode Menu */}
        {menuOpen && (
          <div className="absolute left-10 top-0 glass-white rounded-xl shadow-xl border border-emerald-100 overflow-hidden z-50 w-48 animate-slide-in-left">
            <div className="p-1 text-xs font-body font-semibold text-gray-500 uppercase tracking-wider px-3 pt-2">
              Panel Controls
            </div>
            {[
              { mode: "open" as PanelMode, icon: Maximize2, label: "Open Panel" },
              { mode: "minimized" as PanelMode, icon: Minimize2, label: "Minimize" },
              { mode: "half" as PanelMode, icon: Layout, label: "Half Screen" },
              { mode: "fullscreen" as PanelMode, icon: Maximize2, label: "Full Screen" },
              { mode: "pip" as PanelMode, icon: PictureInPicture, label: "Picture-in-Picture" },
              { mode: "floating" as PanelMode, icon: Layers, label: "Floating Screen" },
              { mode: "minimized" as PanelMode, icon: X, label: "Close" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => applyMode(item.mode)}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 transition-all"
              >
                <item.icon className="w-3.5 h-3.5 text-emerald-600" />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Floating / PiP Sidebar */}
      {isFloating && (
        <div
          ref={pipRef}
          className="pip-window"
          style={{ left: pipPos.x, top: pipPos.y }}
          onMouseDown={onMouseDown}
        >
          {panelContent}
        </div>
      )}

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md overflow-auto">
          <div className="max-w-2xl mx-auto p-6">{panelContent}</div>
        </div>
      )}

      {/* Normal Sidebar (open / half) */}
      {!isHidden && !isFloating && !isFullscreen && (
        <aside
          className={`fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] p-3 transition-all duration-300 animate-slide-in-left ${
            isHalf ? "w-[50vw] max-w-md" : "w-72"
          }`}
        >
          {panelContent}
        </aside>
      )}
    </>
  );
};

export default LeftSidebar;
