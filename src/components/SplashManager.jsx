import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "./SplashScreen";
import Header from "./Header";
import Footer from "./Footer";

export default function SplashManager() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
      ) : (
        <div
          key="main"
          className="min-h-screen flex flex-col bg-[#121212] text-white animate-fadeIn"
        >
          <Header />
          <main className="flex-grow flex items-center justify-center text-3xl">
            Welcome to PasswordSaver!
          </main>
          <Footer />
        </div>
      )}
    </AnimatePresence>
  );
}
