import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Shield, Globe, Heart, FileText, AlertTriangle, Mail, ChevronDown, ChevronRight } from "lucide-react";

const sections = [
  {
    id: "about",
    icon: Globe,
    color: "#007a4a",
    title: "About Us",
    titleUr: "ہمارے بارے میں",
    content: `We're committed to Enhance the whole world in every field of life within the Unity, Integrity and Universality — In-sha-Allah Azza-wa-Jall.

SMART WORLD ORDER™ is a Global Family Platform Vision by Dr M Irfan Qadir Thaheem — The One Man Army.

ESOneWorld™ | @uniorbi.com™

Our platform encompasses six powerful UniX brands: UniFeel™, UniEdge™, UniNews™, UniSpark™, UniMail™, and UniHost™ — each designed to serve humanity in a specific domain while maintaining the overarching vision of global unity.`,
    urdu: "ہم دنیا کے ہر شعبے کو اتحاد، سالمیت اور آفاقیت کے ساتھ بہتر بنانے کے لیے پرعزم ہیں — إن شاء الله عزوجل",
  },
  {
    id: "mission",
    icon: Heart,
    color: "#b8860b",
    title: "Vision & Mission",
    titleUr: "وژن اور مشن",
    content: `VISION: To build a unified, dignified and universally inclusive global digital ecosystem — where every human being regardless of nationality, language, religion or background can access knowledge, communicate freely, and contribute to the shared advancement of humanity.

MISSION: To deliver world-class digital platforms that promote unity, enable communication, spark creativity, and serve every human on Earth with integrity and purpose.`,
    urdu: "وژن: ایک متحد، باوقار اور آفاقی ڈیجیٹل ماحول کی تعمیر جہاں ہر انسان علم تک رسائی حاصل کر سکے",
  },
  {
    id: "copyright",
    icon: Shield,
    color: "#007a4a",
    title: "Copyright Notice",
    titleUr: "کاپی رائٹ",
    content: `© 2024–2026 SMART WORLD ORDER™ | ESOneWorld™. All Rights Reserved.

All content, designs, source code, brand identities, visual elements, and intellectual property contained within this platform are exclusively owned by Dr M Irfan Qadir Thaheem and SMART WORLD ORDER™.

Unauthorized reproduction, distribution, modification, or commercial use of any portion of this platform without express written permission is strictly prohibited and will be subject to legal action.

The trademarks SMART WORLD ORDER™, ESOneWorld™, UniFeel™, UniEdge™, UniNews™, UniSpark™, UniMail™, UniHost™, and @uniorbi.com™ are protected intellectual property.`,
    urdu: "تمام حقوق محفوظ ہیں — سمارٹ ورلڈ آرڈر™ | ڈاکٹر محمد عرفان قادر طاہم",
  },
  {
    id: "disclaimer",
    icon: AlertTriangle,
    color: "#e8003d",
    title: "Disclaimer",
    titleUr: "اعلامیہ",
    content: `This platform is provided "as is" without warranties of any kind, express or implied.

SMART WORLD ORDER™ reserves the right to:
• Modify, update, or discontinue any feature, service, or content at any time without prior notice
• Change platform terms, policies, and access conditions
• Suspend or terminate accounts that violate platform guidelines

The information provided on this platform is for general informational and educational purposes only. SMART WORLD ORDER™ does not accept liability for any direct, indirect, or consequential damages arising from use of this platform.

Third-party integrations, services, and APIs are governed by their respective terms of service.`,
    urdu: "یہ پلیٹ فارم 'جیسا ہے' فراہم کیا جاتا ہے۔ سمارٹ ورلڈ آرڈر™ کسی بھی نقصان کے لیے ذمہ دار نہیں۔",
  },
  {
    id: "privacy",
    icon: FileText,
    color: "#4f46e5",
    title: "Privacy Policy",
    titleUr: "رازداری پالیسی",
    content: `SMART WORLD ORDER™ is committed to protecting your privacy and personal data.

DATA COLLECTION: We collect only the minimum personal data required for platform functionality. This may include account credentials, usage preferences, and communication data.

DATA USE: Your data is used solely to:
• Provide and improve platform services
• Personalize your experience
• Ensure security and prevent fraud

DATA PROTECTION: All personal data is encrypted and stored securely. We implement industry-standard security measures.

DATA SHARING: We do NOT sell, rent, or share personal data with third parties without explicit consent, except as required by law.

YOUR RIGHTS: You have the right to access, correct, or delete your personal data at any time by contacting us.

CONTACT: dr.mirfan5577@gmail.com`,
    urdu: "ہم آپ کی ذاتی معلومات کی حفاظت کے لیے پرعزم ہیں۔ آپ کا ڈیٹا کبھی فروخت نہیں کیا جائے گا۔",
  },
  {
    id: "contact",
    icon: Mail,
    color: "#007a4a",
    title: "Contact & Support",
    titleUr: "رابطہ",
    content: `For queries, suggestions, or support:

Email: dr.mirfan5577@gmail.com
Platform: @uniorbi.com™
Vision: Dr M Irfan Qadir Thaheem — The One Man Army

SMART WORLD ORDER™ | ESOneWorld™
"Enhancing the whole world in Unity, Integrity and Universality"`,
    urdu: "مزید معلومات اور تجاویز کے لیے: dr.mirfan5577@gmail.com",
  },
];

const Legal: React.FC = () => {
  const { isRTL } = useTranslation();
  const [expanded, setExpanded] = useState<string[]>(["about"]);

  const toggle = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div
      className="min-h-screen bg-platform-hero py-12 px-6"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-white px-5 py-2 rounded-full text-sm font-body font-semibold text-gray-600 mb-4 shadow">
            <Shield className="w-4 h-4 text-emerald-600" />
            Legal Information
          </div>
          <h1 className="font-heading font-black text-4xl md:text-5xl text-gradient-royal mb-3">
            Platform Legal
          </h1>
          <p className="font-body text-gray-500">
            SMART WORLD ORDER™ | ESOneWorld™ — Legal Documentation
          </p>
        </div>

        {/* Accordion Sections */}
        <div className="space-y-3">
          {sections.map((section) => (
            <div
              key={section.id}
              className="glass-white rounded-2xl overflow-hidden"
              style={{
                boxShadow: expanded.includes(section.id)
                  ? `0 8px 32px ${section.color}12, 0 0 0 1.5px ${section.color}25`
                  : "0 2px 12px rgba(0,0,0,0.04)",
              }}
            >
              <button
                onClick={() => toggle(section.id)}
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                      background: `${section.color}15`,
                      border: `1px solid ${section.color}25`,
                    }}
                  >
                    <section.icon
                      className="w-4 h-4"
                      style={{ color: section.color }}
                    />
                  </div>
                  <div className="text-left">
                    <div className="font-heading font-semibold text-gray-800">
                      {section.title}
                    </div>
                    <div
                      className="text-xs font-urdu text-gray-500"
                      dir="rtl"
                    >
                      {section.titleUr}
                    </div>
                  </div>
                </div>
                {expanded.includes(section.id) ? (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>

              {expanded.includes(section.id) && (
                <div
                  className="px-5 pb-5"
                  style={{ borderTop: `1px solid ${section.color}20` }}
                >
                  <div className="pt-4">
                    <pre className="font-body text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                      {section.content}
                    </pre>
                    <div
                      className="font-urdu text-gray-600 text-sm leading-loose mt-4 text-right p-3 rounded-xl"
                      dir="rtl"
                      style={{ background: `${section.color}08` }}
                    >
                      {section.urdu}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-10 glass-white rounded-2xl p-6 text-center">
          <div className="font-heading font-bold text-gradient-royal text-xl mb-2">
            SMART WORLD ORDER™
          </div>
          <p className="font-body text-sm text-gray-500 mb-1">
            A Vision by <strong>Dr M Irfan Qadir Thaheem</strong> — The One Man Army
          </p>
          <p className="font-urdu text-sm text-gray-600" dir="rtl">
            ڈاکٹر محمد عرفان قادر طاہم — دی ون مین آرمی
          </p>
          <div className="mt-3 text-xs text-gray-400">
            © 2024–2026 All Rights Reserved | ESOneWorld™ | @uniorbi.com™
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal;
