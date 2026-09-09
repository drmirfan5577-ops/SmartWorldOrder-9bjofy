import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { SUB_BRANDS } from "@/constants";
import { Mail, Globe, Shield } from "lucide-react";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useTranslation();

  return (
    <footer
      className="relative overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        background:
          "linear-gradient(180deg, #ffffff 0%, #f0fff8 30%, #fff0f3 60%, #fffbf0 100%)",
        borderTop: "1px solid rgba(0,201,122,0.2)",
      }}
    >
      {/* Glowing Separator */}
      <div
        className="h-0.5 w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, #00c97a, #ffd700, #e8003d, transparent)",
          boxShadow: "0 0 12px rgba(0,201,122,0.5)",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="font-heading font-black text-2xl text-gradient-royal mb-1">
              SMART WORLD ORDER™
            </div>
            <div className="text-sm font-body text-gray-500 mb-3">ESOneWorld™ | @uniorbi.com™</div>
            <p className="text-sm font-body text-gray-600 leading-relaxed mb-4 max-w-sm">
              We're committed to Enhance the whole world in every field of life within
              Unity, Integrity and Universality — In-sha-Allah Azza-wa-Jall.
            </p>
            <div
              className="text-sm font-urdu text-gray-700 leading-loose text-right mb-4"
              dir="rtl"
            >
              ہم دنیا کے ہر شعبے کو اتحاد، سالمیت اور آفاقیت کے ساتھ بہتر بنانے کے لیے
              پرعزم ہیں — إن شاء الله عزوجل
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-600" />
              <a
                href="mailto:dr.mirfan5577@gmail.com"
                className="text-sm text-emerald-700 hover:text-emerald-900 font-body transition-colors"
              >
                dr.mirfan5577@gmail.com
              </a>
            </div>
          </div>

          {/* Platform Brands */}
          <div>
            <h4 className="font-heading font-bold text-gray-800 mb-4 text-sm uppercase tracking-widest">
              {t("sub_brands")}
            </h4>
            <div className="space-y-2">
              {SUB_BRANDS.map((brand) => (
                <div
                  key={brand.id}
                  className="flex items-center gap-2 text-sm font-body text-gray-600 hover:text-emerald-700 cursor-pointer transition-colors"
                >
                  <span>{brand.icon}</span>
                  <span className="font-semibold font-heading">{brand.name}</span>
                  <span className="text-gray-400 text-xs">— {brand.tagline}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-gray-800 mb-4 text-sm uppercase tracking-widest">
              Quick Links
            </h4>
            <div className="space-y-2">
              {[
                { label: t("about"), path: "/legal" },
                { label: t("privacy"), path: "/legal" },
                { label: t("copyright"), path: "/legal" },
                { label: t("disclaimer"), path: "/legal" },
                { label: t("mission"), path: "/legal" },
                { label: t("admin_panel"), path: "/admin" },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => navigate(link.path)}
                  className="block text-sm font-body text-gray-600 hover:text-emerald-700 transition-colors w-full text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs font-body text-gray-500 text-center md:text-left">
            © 2024–2026 <strong>SMART WORLD ORDER™</strong> | ESOneWorld™ | All Rights Reserved
            <br />
            <span className="text-gray-400">
              A Vision by <strong>Dr M Irfan Qadir Thaheem</strong> — The One Man Army
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-body text-gray-400">
            <div className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-emerald-500" />
              <span>Global Platform</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-red-500" />
              <span>Fully Protected</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live & Active</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
