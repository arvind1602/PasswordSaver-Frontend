import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate , Link } from "react-router-dom";
import AlreadyLoggedInNotice from "./AlreadyLoggedInNotice";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const navigate = useNavigate();

  // 🧠 Reusable function to show error
  const showError = (msg) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(null), 3000);
  };

  // 🧠 Reusable function to show success
  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ✅ Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://passwordsaverbackend.onrender.com/api/users/create", form);

      // Send email code
      await axios.post("https://passwordsaverbackend.onrender.com/api/email/send-code", {
        email: res.data.data.email,
        username: res.data.data.username,
      });

      showSuccess("🎉 Signup successful. Code sent to email.");
      setShowVerifyModal(true);
    } catch (err) {
      
      showError(err?.response?.data?.message || "❌ Signup failed");
    }
  };

  // 🔐 Handle code verification
  const handleVerify = async () => {
    try {
      const res = await axios.post("https://passwordsaverbackend.onrender.com/api/email/verify-code", {
        email: form.email,
        username: form.username,
        code: verificationCode,
      });

      if (res.status === 200) {
        showSuccess("✅ Email verified!");
        setTimeout(() => navigate("/signin"), 2000);
      } else {
        showError("❌ Invalid code. Try again.");
      }
    } catch {
      showError("❌ Verification failed");
    }
  };

  // 🔁 Handle resend code
  const handleResendCode = async () => {
    try {
      await axios.post("https://passwordsaverbackend.onrender.com/api/email/send-code", {
        email: form.email,
        username: form.username,
      });
      showSuccess("📧 Verification code resent.");
    } catch {
      showError("❌ Failed to resend code.");
    }
  };

  // 🔒 Check if user already logged in
  useEffect(() => {
    (async () => {
      try {
        await axios.get("https://passwordsaverbackend.onrender.com/api/user/profile", { withCredentials: true });
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      }
    })();
  }, []);

  if (isLoggedIn === null) return <div className="text-white">Checking...</div>;
  if (isLoggedIn) return <AlreadyLoggedInNotice />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4">
      <div className="bg-white/5 p-8 rounded-xl w-full max-w-md text-white relative border border-gray-700 shadow-xl">
        {errorMsg && <Alert message={errorMsg} type="error" />}
        {successMsg && <Alert message={successMsg} type="success" />}

        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Full Name"
            name="fullname"
            value={form.fullname}
            onChange={handleChange}
          />
          <Input
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
          <Input
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
          />

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
                className="w-full px-4 py-2 pr-10 rounded-md bg-gray-800 border border-gray-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-semibold rounded"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-6">
          I have an account?{" "}
          <Link to="/signin" className="text-cyan-400 hover:underline">
            Sign In here
          </Link>
        </p>
      </div>

      {/* 📩 Email Verification Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1e1e2f] p-6 rounded-lg w-full max-w-sm text-white border border-cyan-500 shadow-xl">
            <h3 className="text-xl font-semibold mb-4 text-cyan-400">
              Verify Your Email
            </h3>
            <p className="text-gray-300 text-sm mb-2">
              We’ve sent a 6-digit code to <b>{form.email}</b>. Please enter it
              below:
            </p>
            <input
              type="text"
              maxLength="6"
              className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600"
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <button
              onClick={handleVerify}
              className="w-full py-2 bg-green-500 hover:bg-green-600 rounded font-semibold"
            >
              Verify Code
            </button>
            <div className="flex justify-between gap-2 mt-4">
              <button
                onClick={handleResendCode}
                className="w-1/2 py-2 bg-blue-500 hover:bg-blue-600 rounded font-semibold"
              >
                Resend Code
              </button>
              <button
                onClick={() => setShowVerifyModal(false)}
                className="w-1/2 py-2 bg-red-500 hover:bg-red-600 rounded font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function Input({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block mb-1 text-sm">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600"
      />
    </div>
  );
}

function Alert({ message, type }) {
  return (
    <div className="absolute top-[-70px] left-0 w-full z-50">
      <div
        className={`p-3 text-center rounded-md text-sm shadow-md ${
          type === "error"
            ? "bg-red-600/20 text-red-300 border border-red-400"
            : "bg-green-600/20 text-green-300 border border-green-400"
        }`}
      >
        {message}
      </div>
    </div>
  );
}
