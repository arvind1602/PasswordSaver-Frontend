import { motion } from "framer-motion";
import { useEffect } from "react";

export default function SplashScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete(); // Show main app after delay
    }, 2500); // 3 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="flex items-center justify-center h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="p-10 rounded-2xl shadow-2xl bg-black bg-opacity-40 backdrop-blur-lg border border-gray-600"
        initial={{ scale: 0.6, opacity: 0, y: -40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-center tracking-wider drop-shadow-glow"
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 150 }}
        >
          <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            PasswordSaver 🔐
          </span>
        </motion.h1>

        <p className="text-center text-gray-300 mt-3 text-sm md:text-base">
          Lock it. Save it. Own it.
        </p>
      </motion.div>
    </motion.div>
  );
}
