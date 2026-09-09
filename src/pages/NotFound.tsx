import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-platform-hero flex items-center justify-center px-6">
      <div className="text-center">
        <div className="font-heading font-black text-9xl text-gradient-emerald mb-4">404</div>
        <h1 className="font-heading font-bold text-3xl text-gray-800 mb-3">Page Not Found</h1>
        <p className="font-body text-gray-500 mb-8">This page doesn't exist in the SMART WORLD ORDER™ universe.</p>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-body font-semibold rounded-xl mx-auto transition-all"
        >
          <Home className="w-4 h-4" />
          Return Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
