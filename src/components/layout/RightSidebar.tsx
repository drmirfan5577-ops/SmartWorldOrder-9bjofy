import React, { useState, useRef } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import {
  Minimize2,
  Maximize2,
  PictureInPicture,
  X,
  Star,
  Layers,
  Layout,
  Bell,
  BookOpen,
  Rss,
  ChevronLeft,
} from "lucide-react";

type PanelMode = "open" | "minimized" | "pip" | "half" | "fullscreen" | "floating";

const quickLinks = [
  { label: "UniFeel™ Feed", icon: "💚", category: "Social" },
  { label: "UniNews™ Highlights", icon: "📰", category: "News" },
  { label: "UniSpark™ Ideas", icon: "✨", category: "Creative" },
  { label: "UniEdge™ Analytics", icon: "⚡", category: "Data" },
  { label: "UniMail™ Inbox", icon: "✉️", category: "Mail" },
  { label: "UniHost™ Status", icon: "🌐", category: "Infra" },
];

const notices = [
  { msg: "Platform V1.0 is live", time: "Just now", type: "success" },
  { msg: "6 UniX brands activated", time: "2m ago", type: "info" },
  { msg: "Auto-sync completed", time: "5m ago", type: "success" },
  { msg: "Admin panel ready", time: "10m ago", type: "warning" },
];

const RightSidebar: React.FC = () => {
  const { t } = useTranslation();
  const [mode, setMode] = useState<PanelMode>("minimized");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"quick" | "notices" | "docs">("quick");
  const [pipPos, setPipPos] = useState({ x: window.innerWidth - 340, y: 200 });
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const applyMode = (m: PanelMode) => {
    setMode(m);
    setMenuOpen(false);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (mode !== "floating" && mode !== "pip") return;
    isDragging.current = true;
    dragOffset.current = { x: e.clientX - pipPos.x, y: e.clientY - pipPos.y };
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

  const panelContent = (
    <div
      className="glass-crimson rounded-2xl overflow-hidden flex flex-col"
      style={{ height: isFloating ? "min(500px, 80vh)" : isFullscreen ? "100%" : "100%" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-red-200/60 bg-gradient-to-r from-red-50 to-white">
        <div className="flex items-center gap-2">
          <Rss className="w-4 h-4 text-red-700" />
          <span className="text-sm font-heading font-semibold text-red-800">
            {t("right_panel")}
          </span>
        </div>
        <button
          onClick={() => setMode("minimized")}
          className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-100 text-gray-400 hover:text-red-600 transition-all"
        >
          <X className="w-3 h-3" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-red-100">
        {(["quick", "notices", "docs"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-xs font-body font-medium capitalize transition-all ${
              activeTab === tab
                ? "text-red-700 border-b-2 border-red-500 bg-red-50"
                : "text-gray-500 hover:text-red-600"
            }`}
          >
            {tab === "quick" ? "Quick Links" : tab === "notices" ? "Notices" : "Docs"}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {activeTab === "quick" && (
          <>
            {quickLinks.map((link) => (
              <div
                key={link.label}
                className="flex items-center gap-3 p-3 rounded-xl glass-white hover:bg-red-50 cursor-pointer group transition-all"
              >
                <span className="text-xl">{link.icon}</span>
                <div className="flex-1">
                  <div className="text-sm font-body font-medium text-gray-800 group-hover:text-red-700 truncate">
                    {link.label}
                  </div>
                  <div className="text-xs text-gray-500">{link.category}</div>
                </div>
                <ChevronLeft className="w-3 h-3 text-gray-400 rotate-180 group-hover:text-red-500" />
              </div>
            ))}
          </>
        )}

        {activeTab === "notices" && (
          <div className="space-y-2">
            {notices.map((n, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border text-sm font-body transition-all ${
                  n.type === "success"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                    : n.type === "warning"
                    ? "bg-yellow-50 border-yellow-200 text-yellow-800"
                    : "bg-blue-50 border-blue-200 text-blue-800"
                }`}
              >
                <div className="font-medium">{n.msg}</div>
                <div className="text-xs opacity-70 mt-0.5">{n.time}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "docs" && (
          <div className="space-y-2">
            {[
              "Platform Architecture Guide",
              "Admin Panel Documentation",
              "API Integration Manual",
              "Multi-Language Setup",
              "Launcher Customization",
              "Legal & Compliance Docs",
            ].map((doc) => (
              <div
                key={doc}
                className="flex items-center gap-2 p-3 rounded-xl glass-white hover:bg-red-50 cursor-pointer group transition-all"
              >
                <BookOpen className="w-4 h-4 text-red-500 group-hover:text-red-700" />
                <span className="text-sm font-body text-gray-700 group-hover:text-red-700">
                  {doc}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Live Indicator */}
      <div className="px-4 py-2 bg-red-50 border-t border-red-100 flex items-center gap-2">
        <Bell className="w-3 h-3 text-red-500" />
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-xs text-red-700 font-body">Live Updates Active</span>
      </div>
    </div>
  );

  return (
    <>
      {/* Star Toggle */}
      <div className="fixed top-16 right-3 z-50">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-lg border border-red-300 hover:border-red-500 transition-all duration-200"
          style={{ animation: "star-pulse 2.4s ease-in-out infinite" }}
          title={t("right_panel")}
        >
          <Star className="w-4 h-4 fill-red-400 text-red-500" />
        </button>

        {menuOpen && (
          <div className="absolute right-10 top-0 glass-white rounded-xl shadow-xl border border-red-100 overflow-hidden z-50 w-48 animate-slide-in-right">
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
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-800 transition-all"
              >
                <item.icon className="w-3.5 h-3.5 text-red-600" />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Floating */}
      {isFloating && (
        <div
          className="pip-window"
          style={{ left: pipPos.x, top: pipPos.y, width: 300 }}
          onMouseDown={onMouseDown}
        >
          {panelContent}
        </div>
      )}

      {/* Fullscreen */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md overflow-auto">
          <div className="max-w-2xl mx-auto p-6 h-full">{panelContent}</div>
        </div>
      )}

      {/* Normal */}
      {!isHidden && !isFloating && !isFullscreen && (
        <aside
          className={`fixed top-16 right-0 z-40 h-[calc(100vh-4rem)] p-3 transition-all duration-300 animate-slide-in-right ${
            isHalf ? "w-[50vw] max-w-md" : "w-72"
          }`}
        >
          {panelContent}
        </aside>
      )}
    </>
  );
};

export default RightSidebar;
