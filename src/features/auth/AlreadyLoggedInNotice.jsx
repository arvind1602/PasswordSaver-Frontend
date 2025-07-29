import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AlreadyLoggedInNotice() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/profile"); // Redirect after 3 seconds
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg text-center text-white max-w-md w-full">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">
          ⚠️ You're already logged in!
        </h2>
        <p className="text-gray-300">Redirecting you to your Profile...</p>
      </div>
    </div>
  );
}
