import React, { useState, useRef } from "react";
import { useApp } from "@/contexts/AppContext";
import { useTranslation } from "@/hooks/useTranslation";
import { ADMIN_PASSWORD, SUB_BRANDS, LAUNCHER_THEMES } from "@/constants";
import type { AdminFeature } from "@/types";
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Edit3,
  ToggleLeft,
  ToggleRight,
  Download,
  Upload,
  RefreshCw,
  Palette,
  Globe,
  Layers,
  Settings,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Star,
  Mail,
} from "lucide-react";

const AdminPanel: React.FC = () => {
  const { isAdminAuthenticated, setAdminAuthenticated, adminFeatures, setAdminFeatures, activeLauncher, setActiveLauncher, theme, setTheme } = useApp();
  const { t, isRTL } = useTranslation();

  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [expandedSections, setExpandedSections] = useState<string[]>(["dashboard"]);

  // Add More state
  const [newFeatureName, setNewFeatureName] = useState("");
  const [newFeatureSection, setNewFeatureSection] = useState("General");
  const [newFeatureDesc, setNewFeatureDesc] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAdminAuthenticated(true);
      setAuthError(false);
      localStorage.setItem("swo_admin_auth", "true");
    } else {
      setAuthError(true);
      setTimeout(() => setAuthError(false), 3000);
    }
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    localStorage.removeItem("swo_admin_auth");
    setPassword("");
  };

  const triggerSave = () => {
    setSaveStatus("saving");
    setTimeout(() => setSaveStatus("saved"), 800);
    setTimeout(() => setSaveStatus("idle"), 2500);
  };

  const addFeature = () => {
    if (!newFeatureName.trim()) return;
    const newF: AdminFeature = {
      id: `feature_${Date.now()}`,
      section: newFeatureSection,
      name: newFeatureName.trim(),
      description: newFeatureDesc.trim(),
      enabled: true,
      createdAt: new Date().toISOString(),
    };
    setAdminFeatures([...adminFeatures, newF]);
    setNewFeatureName("");
    setNewFeatureDesc("");
    triggerSave();
  };

  const toggleFeature = (id: string) => {
    setAdminFeatures(adminFeatures.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f)));
    triggerSave();
  };

  const deleteFeature = (id: string) => {
    setAdminFeatures(adminFeatures.filter((f) => f.id !== id));
    triggerSave();
  };

  const startEdit = (f: AdminFeature) => {
    setEditingId(f.id);
    setEditName(f.name);
  };

  const saveEdit = (id: string) => {
    setAdminFeatures(adminFeatures.map((f) => (f.id === id ? { ...f, name: editName } : f)));
    setEditingId(null);
    triggerSave();
  };

  const toggleSection = (s: string) => {
    setExpandedSections((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const sectionGroups = [...new Set(adminFeatures.map((f) => f.section))];

  // LOGIN SCREEN
  if (!isAdminAuthenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6 bg-platform-hero"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{
                background: "linear-gradient(135deg, rgba(0,201,122,0.15), rgba(255,215,0,0.12), rgba(232,0,61,0.1))",
                boxShadow: "0 0 32px rgba(0,201,122,0.2), 0 0 64px rgba(255,215,0,0.1), inset 0 0 16px rgba(255,255,255,0.9)",
                border: "1.5px solid rgba(0,201,122,0.3)",
              }}
            >
              <Shield
                className="w-10 h-10"
                style={{ color: "#007a4a", filter: "drop-shadow(0 0 8px rgba(0,201,122,0.8))" }}
              />
            </div>
            <h1 className="font-heading font-black text-3xl text-gradient-emerald mb-1">
              {t("admin_panel")}
            </h1>
            <p className="font-body text-gray-500 text-sm">
              SMART WORLD ORDER™ | Confidential Access Only
            </p>
            <p className="font-urdu text-gray-600 text-sm mt-1" dir="rtl">
              مکمل طور پر پاسورڈ پروٹیکٹڈ
            </p>
          </div>

          {/* Login Card */}
          <div
            className="glass-white rounded-3xl p-8"
            style={{
              boxShadow: "0 20px 60px rgba(0,201,122,0.12), 0 0 0 1.5px rgba(0,201,122,0.2)",
            }}
          >
            <div className="mb-6">
              <label className="block text-sm font-body font-medium text-gray-700 mb-2">
                <Lock className="w-4 h-4 inline mr-1 text-emerald-600" />
                {t("enter_password")}
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none font-body text-gray-800 bg-white/80 transition-all text-lg tracking-widest"
                  style={{ letterSpacing: "0.3em" }}
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl mb-4 text-sm text-red-700">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {t("wrong_password")}
              </div>
            )}

            <button
              onClick={handleLogin}
              className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-body font-bold text-base rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02]"
              style={{ boxShadow: "0 4px 20px rgba(0,201,122,0.4)" }}
            >
              {t("login")} →
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
              <Shield className="w-3 h-3" />
              <span>Password protected — Confidential Access</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ADMIN DASHBOARD
  const navItems = [
    { id: "dashboard", icon: Settings, label: "Dashboard" },
    { id: "brands", icon: Globe, label: t("sub_brands") },
    { id: "launchers", icon: Palette, label: t("launchers") },
    { id: "features", icon: Layers, label: "Add More ( + )" },
    { id: "legal", icon: Shield, label: t("legal") },
    { id: "docs", icon: Download, label: "Documentation" },
  ];

  return (
    <div
      className="min-h-screen flex bg-platform-hero"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Admin Sidebar */}
      <aside className="w-64 glass-white border-r border-emerald-100 flex flex-col">
        <div className="p-6 border-b border-emerald-100">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-5 h-5 text-emerald-700" />
            <span className="font-heading font-bold text-emerald-800">Admin Panel</span>
          </div>
          <div className="text-xs text-gray-500">SWO™ Control Center</div>
          {saveStatus !== "idle" && (
            <div
              className={`mt-2 flex items-center gap-1 text-xs ${
                saveStatus === "saving" ? "text-yellow-600" : "text-emerald-600"
              }`}
            >
              {saveStatus === "saving" ? (
                <RefreshCw className="w-3 h-3 animate-spin" />
              ) : (
                <CheckCircle className="w-3 h-3" />
              )}
              {saveStatus === "saving" ? "Saving..." : t("saved")}
            </div>
          )}
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body font-medium transition-all ${
                activeSection === item.id
                  ? "bg-emerald-100 text-emerald-800 font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-emerald-700"
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-emerald-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-body text-red-600 hover:bg-red-50 transition-all"
          >
            <Lock className="w-4 h-4" />
            {t("logout")}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Welcome Banner */}
        {activeSection === "dashboard" && (
          <div>
            <div
              className="glass-emerald rounded-3xl p-8 mb-6"
              style={{ boxShadow: "0 8px 32px rgba(0,201,122,0.12)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Star className="w-6 h-6 fill-yellow-400 text-yellow-500" style={{ animation: "star-pulse 2s ease-in-out infinite" }} />
                <h1 className="font-heading font-bold text-2xl text-emerald-800">
                  {t("admin_welcome")}
                </h1>
              </div>
              <p className="font-body text-emerald-700">
                Full Command & Control — SMART WORLD ORDER™ Platform
              </p>
              <p className="font-urdu text-emerald-800 text-sm mt-2" dir="rtl">
                آپ کا مکمل کنٹرول پینل — سمارٹ ورلڈ آرڈر™
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: "UniX Brands", value: "6", color: "#00c97a" },
                { label: "Launchers", value: "8", color: "#ffd700" },
                { label: "Languages", value: "10", color: "#e8003d" },
                { label: "Custom Features", value: adminFeatures.length.toString(), color: "#8b5cf6" },
              ].map((stat) => (
                <div key={stat.label} className="glass-white rounded-2xl p-4 text-center">
                  <div
                    className="font-heading font-black text-3xl mb-1"
                    style={{ color: stat.color, filter: `drop-shadow(0 0 4px ${stat.color}60)` }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs font-body text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Quick Settings */}
            <div className="glass-white rounded-2xl p-6 mb-6">
              <h3 className="font-heading font-semibold text-gray-800 mb-4">Quick Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm font-body text-gray-700">Theme Mode</span>
                  <button
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-body font-semibold transition-all ${
                      theme === "dark"
                        ? "bg-slate-800 text-white"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {theme === "light" ? "☀️ Light" : "🌙 Dark"}
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm font-body text-gray-700">Active Launcher</span>
                  <span className="text-xs font-body font-semibold text-emerald-700">
                    {LAUNCHER_THEMES.find((l) => l.id === activeLauncher)?.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Brands Section */}
        {activeSection === "brands" && (
          <div>
            <h2 className="font-heading font-bold text-2xl text-gray-800 mb-6">
              {t("sub_brands")} Management
            </h2>
            <div className="space-y-3">
              {SUB_BRANDS.map((brand) => (
                <div
                  key={brand.id}
                  className="glass-white rounded-2xl p-5 flex items-center gap-4"
                >
                  <span className="text-3xl">{brand.icon}</span>
                  <div className="flex-1">
                    <div className="font-heading font-bold text-gray-800">{brand.name}</div>
                    <div className="text-sm text-gray-500">{brand.tagline}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{brand.description}</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-xs font-body bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-all">
                      {t("enable")}
                    </button>
                    <button className="px-3 py-1.5 text-xs font-body bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all">
                      {t("rename")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Launchers Section */}
        {activeSection === "launchers" && (
          <div>
            <h2 className="font-heading font-bold text-2xl text-gray-800 mb-6">
              Launcher Management
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {LAUNCHER_THEMES.map((launcher) => (
                <div
                  key={launcher.id}
                  className={`rounded-2xl p-5 ${launcher.bgStyle} border-2 transition-all cursor-pointer ${
                    activeLauncher === launcher.id
                      ? "border-emerald-400 shadow-lg"
                      : "border-transparent hover:border-gray-200"
                  }`}
                  onClick={() => {
                    setActiveLauncher(launcher.id);
                    triggerSave();
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-heading font-bold text-gray-800">{launcher.name}</div>
                    {activeLauncher === launcher.id && (
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{launcher.description}</p>
                  <div className="flex gap-2">
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ background: launcher.primaryColor }}
                    />
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ background: launcher.accentColor }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add More Features ( + ) */}
        {activeSection === "features" && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-100 text-emerald-700 text-xl font-bold"
              >
                +
              </div>
              <div>
                <h2 className="font-heading font-bold text-2xl text-gray-800">
                  {t("add_more")}
                </h2>
                <p className="text-sm text-gray-500">Add custom features permanently to the platform</p>
              </div>
            </div>

            {/* Add Form */}
            <div
              className="glass-emerald rounded-3xl p-6 mb-6"
              style={{ boxShadow: "0 8px 32px rgba(0,201,122,0.1)" }}
            >
              <h3 className="font-heading font-semibold text-emerald-800 mb-4">
                Add New Feature / Property
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-body text-gray-600 mb-1">{t("section")}</label>
                  <select
                    value={newFeatureSection}
                    onChange={(e) => setNewFeatureSection(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-emerald-200 bg-white text-sm font-body outline-none focus:border-emerald-400"
                  >
                    {["General", "UI/UX", "Brands", "Integration", "Security", "Media", "Legal", ...sectionGroups].filter(
                      (v, i, a) => a.indexOf(v) === i
                    ).map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-body text-gray-600 mb-1">Feature Name</label>
                  <input
                    type="text"
                    value={newFeatureName}
                    onChange={(e) => setNewFeatureName(e.target.value)}
                    placeholder="Feature name..."
                    className="w-full px-3 py-2 rounded-xl border border-emerald-200 bg-white text-sm font-body outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-body text-gray-600 mb-1">Description</label>
                  <input
                    type="text"
                    value={newFeatureDesc}
                    onChange={(e) => setNewFeatureDesc(e.target.value)}
                    placeholder="Optional description..."
                    className="w-full px-3 py-2 rounded-xl border border-emerald-200 bg-white text-sm font-body outline-none focus:border-emerald-400"
                  />
                </div>
              </div>
              <button
                onClick={addFeature}
                disabled={!newFeatureName.trim()}
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-body font-semibold rounded-xl transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Feature
              </button>
            </div>

            {/* Features List grouped by section */}
            {adminFeatures.length === 0 ? (
              <div className="glass-white rounded-2xl p-12 text-center">
                <Plus className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-body">No custom features added yet.</p>
                <p className="text-sm text-gray-400 mt-1">Add your first feature above.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sectionGroups.map((section) => (
                  <div key={section} className="glass-white rounded-2xl overflow-hidden admin-section">
                    <button
                      onClick={() => toggleSection(section)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all"
                    >
                      <span className="font-heading font-semibold text-gray-800">{section}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                          {adminFeatures.filter((f) => f.section === section).length}
                        </span>
                        {expandedSections.includes(section) ? (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </button>

                    {expandedSections.includes(section) && (
                      <div className="border-t border-gray-100 divide-y divide-gray-50">
                        {adminFeatures
                          .filter((f) => f.section === section)
                          .map((feature) => (
                            <div
                              key={feature.id}
                              className={`flex items-center gap-3 px-4 py-3 transition-all ${
                                feature.enabled ? "" : "opacity-50"
                              }`}
                            >
                              <div className="flex-1 min-w-0">
                                {editingId === feature.id ? (
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      value={editName}
                                      onChange={(e) => setEditName(e.target.value)}
                                      className="flex-1 px-2 py-1 text-sm border border-emerald-300 rounded-lg outline-none"
                                      autoFocus
                                    />
                                    <button
                                      onClick={() => saveEdit(feature.id)}
                                      className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs"
                                    >
                                      {t("save")}
                                    </button>
                                  </div>
                                ) : (
                                  <>
                                    <div className="text-sm font-body font-medium text-gray-800">
                                      {feature.name}
                                    </div>
                                    {feature.description && (
                                      <div className="text-xs text-gray-500">{feature.description}</div>
                                    )}
                                  </>
                                )}
                              </div>
                              <div className="flex items-center gap-1.5 flex-shrink-0">
                                <button
                                  onClick={() => toggleFeature(feature.id)}
                                  className="text-gray-400 hover:text-emerald-600 transition-colors"
                                  title={feature.enabled ? t("disable") : t("enable")}
                                >
                                  {feature.enabled ? (
                                    <ToggleRight className="w-5 h-5 text-emerald-500" />
                                  ) : (
                                    <ToggleLeft className="w-5 h-5" />
                                  )}
                                </button>
                                <button
                                  onClick={() => startEdit(feature)}
                                  className="text-gray-400 hover:text-blue-600 transition-colors"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => deleteFeature(feature.id)}
                                  className="text-gray-400 hover:text-red-600 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Legal Section */}
        {activeSection === "legal" && (
          <div>
            <h2 className="font-heading font-bold text-2xl text-gray-800 mb-6">{t("legal")}</h2>
            <div className="space-y-4">
              {[
                { title: "Copyright Notice", content: "© 2024–2026 SMART WORLD ORDER™. All Rights Reserved. Unauthorized reproduction, distribution, or modification of this platform is strictly prohibited." },
                { title: "Disclaimer", content: "This platform is provided 'as is'. SMART WORLD ORDER™ reserves the right to modify features, services, and content at any time without prior notice." },
                { title: "Privacy Policy", content: "We are committed to protecting your privacy. Personal data is collected only as needed for platform functionality and is never sold to third parties." },
                { title: "Mission & Vision", content: "We're committed to Enhance the whole world in every field of life within Unity, Integrity and Universality — In-sha-Allah Azza-wa-Jall." },
              ].map((item) => (
                <div key={item.title} className="glass-white rounded-2xl p-6 admin-section">
                  <h3 className="font-heading font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="font-body text-gray-600 text-sm leading-relaxed">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Documentation Section */}
        {activeSection === "docs" && (
          <div>
            <h2 className="font-heading font-bold text-2xl text-gray-800 mb-6">
              Documentation & Resources
            </h2>
            <div
              className="glass-crimson rounded-3xl p-6 mb-6"
              style={{ boxShadow: "0 8px 32px rgba(232,0,61,0.08)" }}
            >
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-heading font-bold text-red-800 mb-1">
                    Confidential — Admin Only
                  </h3>
                  <p className="text-sm font-body text-red-700">
                    The following documentation is confidential and is accessible only through the
                    Admin Panel. Password protected.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: Download, title: "Source Code Package", desc: "Complete setup source code for real-time backend support and next version upgrades", action: "Download ZIP" },
                { icon: RefreshCw, title: "Server Recovery Kit", desc: "Tools to refresh server links and recover from bugs, errors, or malfunctions instantly", action: "Generate Kit" },
                { icon: Shield, title: "Play Store Documentation", desc: "Complete legalization docs for Google Play Store and other App Store submissions", action: "View Docs" },
                { icon: Star, title: "Ownership Certificate", desc: "Complete personal ownership feasibility documentation and registrations", action: "Generate" },
                { icon: Globe, title: "API Keys & Services", desc: "All API key documentation and third-party service integrations (if available)", action: "View Keys" },
                { icon: Mail, title: "Email Documentation", desc: "Send a copy of all documentation to dr.mirfan5577@gmail.com", action: "Send Email" },
              ].map((doc) => (
                <div key={doc.title} className="glass-white rounded-2xl p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <doc.icon className="w-4 h-4 text-emerald-700" />
                    </div>
                    <div className="flex-1">
                      <div className="font-heading font-semibold text-gray-800 text-sm">{doc.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{doc.desc}</div>
                    </div>
                  </div>
                  <button className="w-full py-2 text-sm font-body font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl transition-all">
                    {doc.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
