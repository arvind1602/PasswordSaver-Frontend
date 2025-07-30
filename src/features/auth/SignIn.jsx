import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/users/login",
        form,
        {
          withCredentials: true,
        }
      );

      setSuccessMsg(response.data.message);
      // Handle login success (e.g., redirect, store user)
    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data.message); // show this in UI
      } else {
        setErrorMsg("Something went wrong. Please try again later.");
      }
    }
  };
  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(null), 2000);
      navigate("/home");

      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  useEffect(() => {
    const timer = setTimeout(() => setErrorMsg(null), 2000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  return (
    <>
      {successMsg && (
        <div
          role="status"
          className="absolute top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-emerald-700 to-green-600 text-white rounded-xl shadow-xl animate-slide-in-right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-green-300 animate-glow"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="text-sm font-semibold tracking-wide">
            {successMsg}
          </span>
        </div>
      )}

      {errorMsg && (
        <div
          role="alert"
          className="absolute top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-2xl border border-red-500 bg-gradient-to-r from-[#2c0f0f] to-[#4b1e1e] text-red-300 animate-slide-in-right"
        >
          <div className="flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 stroke-current text-red-400 animate-glow"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm font-semibold tracking-wide">
              {errorMsg}
            </span>
          </div>
        </div>
      )}

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
            <Link to="/signup" className="text-cyan-400 hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
