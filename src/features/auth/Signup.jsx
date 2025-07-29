import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AlreadyLoggedInNotice from "./AlreadyLoggedInNotice";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/create", form);

      setSuccessMsg("🎉 User created successfully!");
      setErrorMsg(null);
      setForm({
        fullname: "",
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data.message || "❌ Signup failed");
        setSuccessMsg(null);
      } else {
        setErrorMsg("Something went wrong");
        setSuccessMsg(null);
      }
    }
  };

  // Auto-clear messages after 4 seconds
  useEffect(() => {
    if (errorMsg || successMsg) {
      if (successMsg) {
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      }
      const timer = setTimeout(() => {
        setErrorMsg(null);
        setSuccessMsg(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg, successMsg]);

  // null = checking, true/false = result

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/user/profile", {
          withCredentials: true,
        });
        setIsLoggedIn(true); // user is logged in
      } catch {
        setIsLoggedIn(false); // user is not logged in
      }
    })();
  }, []);

  if (isLoggedIn === null) {
    return <div className="text-white p-10">Checking...</div>;
  }

  if (isLoggedIn) {
    return <AlreadyLoggedInNotice />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4">
      <div className="bg-white/5 backdrop-blur-md border border-gray-700 shadow-2xl rounded-2xl p-8 w-full max-w-md text-gray-100 relative">
        {/* 💬 Alerts */}
        {errorMsg && (
          <div className="absolute top-[-70px] left-0 w-full">
            <div className="bg-red-600/20 border border-red-400 text-red-300 p-3 rounded-md text-center text-sm animate-pulse shadow">
              ❌ {errorMsg}
            </div>
          </div>
        )}
        {successMsg && (
          <div className="absolute top-[-70px] left-0 w-full">
            <div className="bg-green-600/20 border border-green-400 text-green-300 p-3 rounded-md text-center text-sm animate-fadeIn shadow">
              ✅ {successMsg}
            </div>
          </div>
        )}

        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="Full Name"
            name="fullname"
            value={form.fullname}
            onChange={handleChange}
            placeholder="Full name"
          />
          <InputField
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <InputField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
          />

          {/* Password Field */}
          <div>
            <label className="block mb-1 text-sm">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Password"
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
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <a href="/signin" className="text-cyan-400 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

// 🔧 Reusable InputField Component
function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>
      <label className="block mb-1 text-sm">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-cyan-500 outline-none"
      />
    </div>
  );
}
