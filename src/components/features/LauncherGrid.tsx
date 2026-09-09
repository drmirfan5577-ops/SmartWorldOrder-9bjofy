import React from "react";
import { useApp } from "@/contexts/AppContext";
import { useTranslation } from "@/hooks/useTranslation";
import { LAUNCHER_THEMES } from "@/constants";
import { Check, Palette } from "lucide-react";

const LauncherGrid: React.FC = () => {
  const { activeLauncher, setActiveLauncher } = useApp();
  const { t, isRTL } = useTranslation();

  return (
    <section
      id="launchers"
      className="py-20 px-6"
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        background:
          "linear-gradient(180deg, #ffffff 0%, #f0fff8 30%, #fffbf0 70%, #fff5f7 100%)",
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-gold px-4 py-1.5 rounded-full text-sm font-body font-semibold text-yellow-800 mb-4">
            <Palette className="w-4 h-4" />
            {t("launchers")}
          </div>
          <h2 className="font-heading font-black text-4xl md:text-5xl text-gradient-gold mb-3">
            Choose Your Launcher
          </h2>
          <p className="font-body text-gray-500 text-base max-w-xl mx-auto">
            8 professionally crafted launcher themes. Each with its own visual identity,
            color system, and atmosphere. Tap to activate.
          </p>
        </div>

        {/* Active Launcher Preview */}
        <div className="mb-10 p-6 rounded-3xl glass-white text-center">
          <div className="text-xs font-body text-gray-400 uppercase tracking-widest mb-2">
            Active Launcher
          </div>
          <div className="font-heading font-bold text-2xl text-gray-800">
            {LAUNCHER_THEMES.find((l) => l.id === activeLauncher)?.name || "Triune Glory™"}
          </div>
          <div className="text-sm font-body text-gray-500 mt-1">
            {LAUNCHER_THEMES.find((l) => l.id === activeLauncher)?.description}
          </div>
        </div>

        {/* Launcher Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {LAUNCHER_THEMES.map((launcher) => {
            const isActive = activeLauncher === launcher.id;
            return (
              <button
                key={launcher.id}
                onClick={() => setActiveLauncher(launcher.id)}
                className={`launcher-card relative overflow-hidden rounded-2xl p-5 text-left transition-all duration-300 ${launcher.bgStyle} ${
                  isActive
                    ? "ring-2 ring-offset-2 shadow-xl"
                    : "shadow-md hover:shadow-lg border border-white/60"
                }`}
                style={
                  isActive
                    ? {
                        ringColor: launcher.accentColor,
                        boxShadow: `0 8px 32px ${launcher.accentColor}30, 0 0 0 2px ${launcher.accentColor}`,
                      }
                    : {}
                }
              >
                {/* Active Badge */}
                {isActive && (
                  <div
                    className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: launcher.accentColor }}
                  >
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}

                {/* Color Preview Orbs */}
                <div className="flex gap-1.5 mb-4">
                  <div
                    className="w-5 h-5 rounded-full"
                    style={{
                      background: launcher.primaryColor,
                      boxShadow: `0 0 8px ${launcher.primaryColor}80`,
                    }}
                  />
                  <div
                    className="w-5 h-5 rounded-full"
                    style={{
                      background: launcher.accentColor,
                      boxShadow: `0 0 8px ${launcher.accentColor}80`,
                    }}
                  />
                  <div
                    className="w-5 h-5 rounded-full border border-gray-200"
                    style={{ background: "#ffffff" }}
                  />
                </div>

                {/* Launcher Name */}
                <div
                  className={`font-heading font-bold text-base mb-1 ${launcher.textStyle}`}
                >
                  {launcher.name}
                </div>
                <p className="text-xs font-body text-gray-500 leading-relaxed">
                  {launcher.description}
                </p>

                {/* Mini Preview Bar */}
                <div
                  className="mt-4 h-1 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${launcher.primaryColor}, ${launcher.accentColor})`,
                    boxShadow: `0 0 6px ${launcher.accentColor}60`,
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LauncherGrid;
