import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import Home from "@/pages/Home";
import AdminPanel from "@/pages/AdminPanel";
import Legal from "@/pages/Legal";
import NotFound from "@/pages/NotFound";
import { Toaster } from "@/components/ui/sonner";

const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="relative min-h-screen bg-background">
          <Header />

          {/* Dual Star-Triggered Sidebars */}
          <LeftSidebar />
          <RightSidebar />

          {/* Page Content */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />
          <Toaster position="bottom-right" richColors />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
