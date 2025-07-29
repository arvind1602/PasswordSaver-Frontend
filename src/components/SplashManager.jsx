import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SplashScreen from "./SplashScreen";

export default function SplashManager() {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!showSplash) {
      const timer = setTimeout(() => {
        navigate("/home"); // Redirect to your home route
      }, 800); // small delay for smooth fade
      return () => clearTimeout(timer);
    }
  }, [showSplash, navigate]);

  return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
      ) : (
        <motion.div
          key="main"
          className="min-h-screen flex items-center justify-center bg-[#121212] text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Optionally show "loading home..." or loader */}
          <p className="text-xl font-medium text-gray-400">Loading Home...</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
