import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔐 Call your login API here
    console.log("Login data", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4">
      <div className="bg-white/5 backdrop-blur-md border border-gray-700 shadow-2xl rounded-2xl p-8 w-full max-w-md text-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
          Sign In to PasswordSaver
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm">Username</label>
            <input
              type="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              placeholder="Username"
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full px-4 py-2 pr-10 rounded-md bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-fuchsia-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-semibold hover:from-cyan-600 hover:to-fuchsia-600 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-cyan-400 hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}
