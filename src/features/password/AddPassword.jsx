import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AddPassword() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    service: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🔐 Password Added:", formData);

    // You can POST to your backend API here

    alert("Password added successfully!");
    navigate("/vault"); // Go back to Vault page after add
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4 py-12">
      <div className="max-w-md mx-auto bg-white/5 backdrop-blur-lg border border-gray-700 p-8 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-transparent bg-clip-text">
          Add New Password 🔐
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Service */}
          <div>
            <label className="block text-sm mb-1">Service Name</label>
            <input
              type="text"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              placeholder="e.g. Google, Facebook"
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm mb-1">Username / Email</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="e.g. arvind1602"
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter secure password"
                className="w-full px-4 py-2 pr-10 rounded-md bg-gray-800 border border-gray-600 outline-none focus:ring-2 focus:ring-fuchsia-500"
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-md font-semibold hover:opacity-90 transition"
          >
            Save Password
          </button>
        </form>
      </div>
    </div>
  );
}
