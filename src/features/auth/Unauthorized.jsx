import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4">
      <div className="bg-white/5 border border-red-500 backdrop-blur-lg rounded-xl shadow-lg p-8 max-w-md text-center text-white animate-fadeIn">
        <div className="text-5xl mb-4">🚫</div>
        <h2 className="text-2xl font-bold mb-2 text-red-400">Access Denied</h2>
        <p className="text-sm text-gray-300 mb-6">
          You must be logged in to access the Password Vault.
        </p>
        <button
          onClick={() => navigate("/signin")}
          className="px-6 py-2 rounded-md bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold hover:opacity-90 transition"
        >
          Go to Sign In
        </button>
      </div>
    </div>
  );
}
