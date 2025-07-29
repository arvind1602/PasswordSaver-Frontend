import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Sample dummy data for simulation
const dummyPasswords = [
  {
    id: 1,
    service: "Gmail",
    username: "arvind1602",
    password: "mySecretPass1",
  },
  {
    id: 2,
    service: "Facebook",
    username: "arvind.fb",
    password: "fbStrongPass!",
  },
];

export default function UpdatePassword() {
  const { id } = useParams(); // from /update-password/:id
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    service: "",
    username: "",
    password: "",
  });

  // Load entry based on ID (simulated from dummy)
  // useEffect(() => {
  //   const selected = dummyPasswords.find((item) => item.id === Number(id));
  //   if (selected) {
  //     setFormData(selected);
  //   } else {
  //     alert("Password entry not found!");
  //     navigate("/vault");
  //   }
  // }, [id, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🔁 Updated Password:", formData);

    // Replace with real API update logic
    alert("Password updated successfully!");
    navigate("/vault");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4 py-12">
      <div className="max-w-md mx-auto bg-white/5 backdrop-blur-lg border border-gray-700 p-8 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 to-pink-500 text-transparent bg-clip-text">
          Update Password ✏️
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
              placeholder="e.g. Gmail"
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
                placeholder="Update your password"
                className="w-full px-4 py-2 pr-10 rounded-md bg-gray-800 border border-gray-600 outline-none focus:ring-2 focus:ring-pink-500"
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
            className="w-full py-2 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-md font-semibold hover:opacity-90 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
