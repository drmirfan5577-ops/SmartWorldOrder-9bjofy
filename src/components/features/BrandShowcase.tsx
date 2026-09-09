import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { SUB_BRANDS } from "@/constants";
import { ArrowRight } from "lucide-react";

const BrandShowcase: React.FC = () => {
  const { t, isRTL } = useTranslation();

  return (
    <section id="brands" className="py-20 px-6" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-emerald px-4 py-1.5 rounded-full text-sm font-body font-semibold text-emerald-800 mb-4">
            <span>★</span>
            {t("sub_brands")}
            <span>★</span>
          </div>
          <h2 className="font-heading font-black text-4xl md:text-5xl text-gradient-royal mb-3">
            The UniX Universe
          </h2>
          <p className="font-body text-gray-500 text-base max-w-xl mx-auto">
            Six powerful platforms uniting humanity across knowledge, communication,
            creativity, and connectivity.
          </p>
        </div>

        {/* Featured Brand (large) */}
        <div className="mb-6 group cursor-pointer">
          <div
            className="relative overflow-hidden rounded-3xl p-8 md:p-12 transition-all duration-300 hover:scale-[1.01]"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,201,122,0.08), rgba(255,215,0,0.06), rgba(232,0,61,0.05))",
              border: "1.5px solid rgba(0,201,122,0.25)",
              boxShadow: "0 12px 48px rgba(0,201,122,0.12), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
          >
            <div
              className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
              style={{
                background: "radial-gradient(circle, #00c97a, transparent)",
                transform: "translate(30%, -30%)",
              }}
            />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="text-6xl animate-float">{SUB_BRANDS[0].icon}</div>
              <div className="flex-1">
                <div className="font-heading font-black text-4xl text-gradient-emerald mb-2">
                  {SUB_BRANDS[0].name}
                </div>
                <div className="font-body font-semibold text-emerald-700 text-lg mb-2">
                  {SUB_BRANDS[0].tagline}
                </div>
                <p className="font-body text-gray-600 max-w-lg">{SUB_BRANDS[0].description}</p>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-body font-semibold transition-all group-hover:scale-105">
                Explore <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SUB_BRANDS.slice(1).map((brand, i) => {
            const gradients = [
              "from-yellow-50 via-amber-50 to-white",
              "from-blue-50 via-sky-50 to-white",
              "from-purple-50 via-violet-50 to-white",
              "from-red-50 via-rose-50 to-white",
              "from-teal-50 via-cyan-50 to-white",
            ];
            const borderColors = [
              "rgba(255,215,0,0.3)",
              "rgba(59,130,246,0.3)",
              "rgba(139,92,246,0.3)",
              "rgba(232,0,61,0.25)",
              "rgba(20,184,166,0.3)",
            ];
            return (
              <div
                key={brand.id}
                className={`group cursor-pointer rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 bg-gradient-to-br ${gradients[i]}`}
                style={{
                  border: `1.5px solid ${borderColors[i]}`,
                  boxShadow: `0 8px 32px ${borderColors[i].replace("0.3", "0.1")}, inset 0 1px 0 rgba(255,255,255,0.9)`,
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl transition-transform duration-300 group-hover:scale-110">
                    {brand.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-heading font-bold text-xl text-gray-900 mb-1">
                      {brand.name}
                    </div>
                    <div className="text-sm font-body font-medium text-gray-600 mb-2">
                      {brand.tagline}
                    </div>
                    <p className="text-xs font-body text-gray-500 leading-relaxed">
                      {brand.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-body font-semibold text-gray-500 group-hover:text-emerald-700 transition-colors">
                  <span>Learn More</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;
