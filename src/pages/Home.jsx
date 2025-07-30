import { Link } from "react-router-dom";
import {
  FaLock,
  FaRocket,
  FaShieldAlt,
  FaUserShield,
  FaThumbsUp,
} from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [User, SetUser] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.post("/api/users/verify", null, {
          withCredentials: true,
        });

        // ✅ Successful response
      } catch (error) {
        // ❌ Handle errors
        if (error.response) {
          console.error("❌ Verification failed:", error.response.data.message);
        } else {
          console.error("❌ Network error or unexpected error:", error.message);
        }
      }
    };

    verifyUser();
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4 py-10 pt-25">
        <div className="max-w-6xl mx-auto text-center">
          {/* 🌟 Hero Section */}
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-transparent bg-clip-text mb-6">
            Welcome to PasswordSaver 🔐
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Your personal, secure digital vault to manage all your passwords
            with simplicity and privacy.
          </p>
          <div className="flex justify-center gap-4 mb-16">
            <Link
              to="/signup"
              className="px-6 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-semibold hover:opacity-90 transition"
            >
              Get Started
            </Link>
            <Link
              to="/vault"
              className="px-6 py-2 rounded-md border border-cyan-400 text-cyan-400 hover:bg-cyan-500 hover:text-white transition"
            >
              Go to Vault
            </Link>
          </div>

          {/* 🚀 Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20 text-left">
            <FeatureCard
              icon={<FaLock />}
              color="text-cyan-400"
              title="100% Encrypted"
              desc="Top-grade encryption keeps your data private and safe."
            />
            <FeatureCard
              icon={<FaRocket />}
              color="text-fuchsia-400"
              title="Fast & Reliable"
              desc="Access and manage your passwords instantly."
            />
            <FeatureCard
              icon={<FaShieldAlt />}
              color="text-yellow-400"
              title="Zero Tracking"
              desc="We don’t sell data. We don’t track. We respect privacy."
            />
          </div>

          {/* 🔍 About Vault */}
          <div className="bg-white/5 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 mb-20 text-left">
            <h2 className="text-3xl font-bold mb-4 text-white">
              What is PasswordSaver?
            </h2>
            <p className="text-gray-300 leading-relaxed">
              PasswordSaver is a secure password management system that allows
              you to save login details for various services in one encrypted
              vault. With military-grade protection and sleek design, your
              secrets stay yours.
            </p>
          </div>

          {/* 🔄 How It Works */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-10 text-center bg-gradient-to-r from-yellow-300 to-pink-500 text-transparent bg-clip-text">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <FeatureCard
                icon={<FaUserShield />}
                color="text-blue-400"
                title="Create Account"
                desc="Sign up and set up your secure vault."
              />
              <FeatureCard
                icon={<FaLock />}
                color="text-pink-400"
                title="Save Passwords"
                desc="Add entries for your favorite apps & websites."
              />
              <FeatureCard
                icon={<FaThumbsUp />}
                color="text-green-400"
                title="Access Anytime"
                desc="Log in from any device securely and instantly."
              />
            </div>
          </div>

          {/* 💬 Testimonials (Placeholder) */}
          <div className="bg-white/5 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 mb-20">
            <h2 className="text-3xl font-bold mb-4 text-white text-center">
              What Users Say 💬
            </h2>
            <p className="text-gray-400 italic text-center">
              “I’ve finally stopped forgetting my passwords! PasswordSaver is
              life-changing.” – A Happy User
            </p>
          </div>

          {/* 📢 CTA Footer */}
          <div className="text-center mt-10">
            <h3 className="text-xl font-semibold mb-4">
              Ready to take control of your passwords?
            </h3>
            <Link
              to="/signup"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold hover:opacity-90 transition"
            >
              Create Your Free Account
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// 🔧 Feature Card Component
function FeatureCard({ icon, title, desc, color = "text-cyan-400" }) {
  return (
    <div className="bg-white/5 p-6 rounded-xl backdrop-blur-md border border-gray-700 shadow-md hover:scale-105 transition-all">
      <div className={`text-3xl mb-3 ${color}`}>{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{desc}</p>
    </div>
  );
}
