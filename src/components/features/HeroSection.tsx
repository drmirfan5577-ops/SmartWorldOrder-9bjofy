import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import heroBanner from "@/assets/hero-banner.jpg";
import { ArrowRight, Globe, Zap, Star } from "lucide-react";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useTranslation();

  return (
    <section
      className="relative overflow-hidden min-h-[90vh] flex flex-col items-center justify-center"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Background Image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBanner}
          alt="SMART WORLD ORDER Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/90" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(0,201,122,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(232,0,61,0.10) 0%, transparent 60%), radial-gradient(ellipse at 50% 20%, rgba(255,215,0,0.12) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Tube Light Top Glow */}
      <div
        className="absolute top-0 left-0 right-0 h-1 z-10"
        style={{
          background: "linear-gradient(90deg, #00c97a, #ffd700, #e8003d, #00c97a)",
          boxShadow: "0 0 20px rgba(0,201,122,0.8), 0 0 40px rgba(255,215,0,0.4)",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Sub-title */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div
            className="h-px w-16"
            style={{ background: "linear-gradient(90deg, transparent, #00c97a)" }}
          />
          <div className="flex items-center gap-2 glass-emerald px-4 py-1.5 rounded-full text-sm font-body font-semibold text-emerald-800">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-500" />
            <span>A Global Family Platform Vision</span>
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-500" />
          </div>
          <div
            className="h-px w-16"
            style={{ background: "linear-gradient(90deg, #00c97a, transparent)" }}
          />
        </div>

        {/* Main Title */}
        <h1
          className="font-heading font-black text-5xl md:text-7xl lg:text-8xl leading-none mb-3 glow-text-emerald"
          style={{ letterSpacing: "-0.02em" }}
        >
          SMART
        </h1>
        <h1
          className="font-heading font-black text-5xl md:text-7xl lg:text-8xl leading-none mb-3 glow-text-gold"
          style={{ letterSpacing: "-0.02em" }}
        >
          WORLD
        </h1>
        <h1
          className="font-heading font-black text-5xl md:text-7xl lg:text-8xl leading-none mb-6 glow-text-crimson"
          style={{ letterSpacing: "-0.02em" }}
        >
          ORDER™
        </h1>

        {/* ESOneWorld */}
        <div className="text-gradient-gold font-heading font-bold text-2xl md:text-3xl mb-4 tracking-widest">
          ESOneWorld™
        </div>

        {/* Vision By */}
        <p className="font-body text-gray-600 text-base md:text-lg mb-2">
          A Vision by{" "}
          <strong className="text-emerald-800">Dr M Irfan Qadir Thaheem</strong>
        </p>
        <p className="font-body text-gray-500 text-sm mb-3 italic">The One Man Army</p>

        {/* Urdu Tagline */}
        <p
          className="font-urdu text-gray-700 text-base md:text-lg mb-8 leading-loose"
          dir="rtl"
        >
          عالمی سطح پر ایک متحد، با وقار اور آفاقی مستقبل کی تعمیر
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button
            onClick={() => document.getElementById("brands")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-body font-bold text-base rounded-2xl shadow-xl transition-all duration-300 hover:scale-105"
            style={{ boxShadow: "0 4px 24px rgba(0,201,122,0.4), 0 0 0 1px rgba(0,201,122,0.2)" }}
          >
            <Globe className="w-5 h-5" />
            {t("explore")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-2 px-8 py-4 glass-white text-emerald-800 font-body font-bold text-base rounded-2xl border-2 border-emerald-200 hover:border-emerald-400 transition-all duration-300 hover:scale-105"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
          >
            <Zap className="w-5 h-5 text-yellow-600" />
            {t("admin_panel")}
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {[
            { value: "6", label: "UniX Brands" },
            { value: "8", label: "Launchers" },
            { value: "10", label: "Languages" },
          ].map((stat) => (
            <div key={stat.label} className="text-center glass-white rounded-2xl p-4">
              <div
                className="font-heading font-black text-3xl text-gradient-emerald"
                style={{ WebkitTextFillColor: "transparent" }}
              >
                {stat.value}
              </div>
              <div className="text-xs font-body text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 animate-float">
        <div className="w-0.5 h-8 bg-gradient-to-b from-emerald-400 to-transparent rounded-full" />
        <div
          className="w-3 h-3 rounded-full"
          style={{ background: "#00c97a", boxShadow: "0 0 8px #00c97a" }}
        />
      </div>
    </section>
  );
};

export default HeroSection;
