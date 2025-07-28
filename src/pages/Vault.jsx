import { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaCopy,
  FaCheckCircle,
  FaTrash,
  FaEdit,
  FaPlus,
} from "react-icons/fa";

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
  {
    id: 3,
    service: "Twitter",
    username: "arvind_tw",
    password: "twPassword@123",
  },
];

export default function Vault() {
  const [visibleIds, setVisibleIds] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [passwords, setPasswords] = useState(dummyPasswords);

  const toggleVisibility = (id) => {
    setVisibleIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const deletePassword = (id) => {
    if (window.confirm("Are you sure you want to delete this password?")) {
      setPasswords(passwords.filter((item) => item.id !== id));
    }
  };

  const updatePassword = (id) => {
    alert(`Update form would open for item ID: ${id}`);
  };

  const addPassword = () => {
    alert("Add password modal would open here.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-transparent bg-clip-text">
            Your Password Vault 🔐
          </h1>
          <button
            onClick={addPassword}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white rounded-md hover:opacity-90 transition"
          >
            <FaPlus /> Add
          </button>
        </div>

        <div className="space-y-6">
          {passwords.map((entry) => (
            <div
              key={entry.id}
              className="bg-white/5 backdrop-blur-lg border border-gray-700 rounded-xl p-6 shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
              <div>
                <h2 className="text-xl font-semibold text-cyan-400">
                  {entry.service}
                </h2>
                <p className="text-gray-300 text-sm">
                  Username: {entry.username}
                </p>
                <p className="text-gray-300 text-sm">
                  Password:{" "}
                  {visibleIds.includes(entry.id) ? entry.password : "••••••••"}
                </p>
              </div>

              <div className="flex gap-4 text-lg">
                {/* Show/Hide */}
                <button
                  onClick={() => toggleVisibility(entry.id)}
                  title="Show/Hide Password"
                  className="hover:text-cyan-400 transition"
                >
                  {visibleIds.includes(entry.id) ? <FaEyeSlash /> : <FaEye />}
                </button>

                {/* Copy */}
                <button
                  onClick={() => copyToClipboard(entry.password, entry.id)}
                  title="Copy Password"
                  className="hover:text-green-400 transition"
                >
                  {copiedId === entry.id ? (
                    <FaCheckCircle className="text-green-400" />
                  ) : (
                    <FaCopy />
                  )}
                </button>

                {/* Update */}
                <button
                  onClick={() => updatePassword(entry.id)}
                  title="Update"
                  className="hover:text-yellow-400 transition"
                >
                  <FaEdit />
                </button>

                {/* Delete */}
                <button
                  onClick={() => deletePassword(entry.id)}
                  title="Delete"
                  className="hover:text-red-500 transition"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
