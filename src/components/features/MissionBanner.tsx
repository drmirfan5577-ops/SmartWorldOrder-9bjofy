import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Globe, Heart, Zap } from "lucide-react";

const MissionBanner: React.FC = () => {
  const { t, isRTL } = useTranslation();

  return (
    <section
      className="relative overflow-hidden py-20 px-6"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Gradient BG */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,201,122,0.06) 0%, rgba(255,215,0,0.05) 50%, rgba(232,0,61,0.06) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0,201,122,0.15) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Luminous Icon */}
        <div className="flex items-center justify-center mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background:
                "radial-gradient(circle, rgba(0,201,122,0.2), rgba(255,215,0,0.1), rgba(232,0,61,0.08))",
              boxShadow:
                "0 0 40px rgba(0,201,122,0.3), 0 0 80px rgba(255,215,0,0.15), inset 0 0 20px rgba(255,255,255,0.8)",
              border: "1.5px solid rgba(0,201,122,0.3)",
            }}
          >
            <Globe
              className="w-10 h-10"
              style={{
                color: "#007a4a",
                filter: "drop-shadow(0 0 8px rgba(0,201,122,0.8))",
              }}
            />
          </div>
        </div>

        {/* Mission Title */}
        <h2 className="font-heading font-black text-4xl md:text-5xl text-gradient-royal mb-6">
          {t("mission")}
        </h2>

        {/* About Text */}
        <div className="glass-white rounded-3xl p-8 md:p-12 mb-8 text-left">
          <p className="font-body text-gray-700 text-lg leading-relaxed mb-6">
            We're committed to Enhance the whole world in every field of life within
            the <strong className="text-emerald-700">Unity</strong>,{" "}
            <strong className="text-yellow-700">Integrity</strong> and{" "}
            <strong className="text-red-700">Universality</strong> — In-sha-Allah Azza-wa-Jall.
          </p>

          <div
            className="font-urdu text-gray-800 text-xl leading-loose text-right mb-6"
            dir="rtl"
            style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
          >
            ہم دنیا کے ہر شعبے کو اتحاد، سالمیت اور آفاقیت کے ساتھ بہتر بنانے کے لیے پرعزم ہیں۔
            إن شاء الله عزوجل
          </div>

          <div
            className="font-arabic text-gray-800 text-xl leading-loose text-right"
            dir="rtl"
            style={{ fontFamily: "'Noto Naskh Arabic', serif" }}
          >
            نحن ملتزمون بتعزيز العالم بأسره في كل مجال من مجالات الحياة ضمن الوحدة والنزاهة
            والعالمية — إن شاء الله عز وجل
          </div>
        </div>

        {/* Three Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Globe,
              title: "Unity",
              urdu: "اتحاد",
              arabic: "الوحدة",
              desc: "One world, one family — transcending borders and divisions",
              color: "#007a4a",
              glow: "#00c97a",
            },
            {
              icon: Heart,
              title: "Integrity",
              urdu: "سالمیت",
              arabic: "النزاهة",
              desc: "Truthful, transparent and principled in every action",
              color: "#b8860b",
              glow: "#ffd700",
            },
            {
              icon: Zap,
              title: "Universality",
              urdu: "آفاقیت",
              arabic: "العالمية",
              desc: "Serving all humanity across every culture and language",
              color: "#9b0028",
              glow: "#e8003d",
            },
          ].map((pillar) => (
            <div
              key={pillar.title}
              className="glass-white rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300"
              style={{
                borderColor: `${pillar.color}30`,
                boxShadow: `0 8px 32px ${pillar.glow}15`,
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{
                  background: `${pillar.glow}18`,
                  boxShadow: `0 0 16px ${pillar.glow}30`,
                  border: `1px solid ${pillar.glow}30`,
                }}
              >
                <pillar.icon
                  className="w-6 h-6"
                  style={{ color: pillar.color, filter: `drop-shadow(0 0 4px ${pillar.glow})` }}
                />
              </div>
              <h3
                className="font-heading font-bold text-xl mb-1"
                style={{ color: pillar.color }}
              >
                {pillar.title}
              </h3>
              <div className="font-urdu text-sm text-gray-600 mb-0.5" dir="rtl">
                {pillar.urdu}
              </div>
              <div className="font-arabic text-sm text-gray-600 mb-3" dir="rtl">
                {pillar.arabic}
              </div>
              <p className="text-xs font-body text-gray-500 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionBanner;
