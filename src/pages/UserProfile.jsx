import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserEdit, FaTrash, FaSignOutAlt, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Header from "../components/Header";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [showUsernameForm, setShowUsernameForm] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/user/profile", {
          withCredentials: true,
        });
        setUser(res.data.data);
      } catch (error) {
        console.error("❌ Failed to fetch user:", error.message);
        navigate("/signin");
      }
    })();
  }, []);

  const handleLogout = async () => {
    await axios.post("/api/users/logout", {}, { withCredentials: true });
    navigate("/signin");
  };

  const handleUsernameUpdate = async () => {
    try {
      await axios.put(
        "/api/users/update-username",
        { username: newUsername },
        { withCredentials: true }
      );
      setUser((prev) => ({ ...prev, username: newUsername }));
      setShowUsernameForm(false);
    } catch (err) {
      alert("Username update failed.");
    }
  };

  const handlePasswordChange = async () => {
    if (!passwords.oldPassword || !passwords.newPassword) {
      return alert("Please fill both fields.");
    }

    try {
      await axios.put("/api/users/change-password", passwords, {
        withCredentials: true,
      });
      alert("✅ Password updated successfully");
      setShowPasswordForm(false);
      setPasswords({ oldPassword: "", newPassword: "" });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "❌ Password update failed.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete("/api/users/delete-account", {
        withCredentials: true,
      });
      navigate("/signup");
    } catch (err) {
      alert("Failed to delete account");
    }
  };

  if (!user) return <div className="text-white p-10">Loading...</div>;

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 py-10">
        <div className="bg-white/5 text-white border border-gray-700 backdrop-blur-md rounded-xl p-8 w-full max-w-lg shadow-xl text-center">
          {/* Profile Image */}
          <div className="w-24 h-24 mx-auto rounded-full bg-cyan-400 text-5xl flex items-center justify-center text-white shadow-lg mb-4">
            {user.username[0].toUpperCase()}
          </div>

          {/* Username */}
          <div className="flex justify-center items-center gap-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-transparent bg-clip-text">
              {user.username}
            </h2>
            <button
              onClick={() => setShowUsernameForm(!showUsernameForm)}
              className="hover:text-yellow-400"
            >
              <FaUserEdit />
            </button>
          </div>

          {/* Email */}
          <p className="text-gray-300 flex justify-center items-center gap-1 text-sm mt-1">
            <MdEmail /> {user.email}
          </p>

          {/* Update Username Form */}
          {showUsernameForm && (
            <div className="mt-4 space-y-2 text-left">
              <input
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="New Username"
              />
              <button
                onClick={handleUsernameUpdate}
                className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 rounded text-white font-semibold"
              >
                Update Username
              </button>
            </div>
          )}

          {/* Change Password */}
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="mt-6 flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-100"
          >
            <FaLock /> Change Password
          </button>

          {showPasswordForm && (
            <div className="mt-4 space-y-2 text-left">
              <input
                type="password"
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
                placeholder="Current Password"
                onChange={(e) =>
                  setPasswords({ ...passwords, oldPassword: e.target.value })
                }
              />
              <input
                type="password"
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
                placeholder="New Password"
                onChange={(e) =>
                  setPasswords({ ...passwords, newPassword: e.target.value })
                }
              />
              <button
                onClick={handlePasswordChange}
                className="w-full py-2 bg-green-500 hover:bg-green-600 rounded text-white font-semibold"
              >
                Save Password
              </button>
            </div>
          )}

          {/* Delete Account */}
          <button
            onClick={() => setShowDeleteModal(true)}
            className="mt-6 flex items-center gap-2 text-red-400 hover:text-red-200 text-sm"
          >
            <FaTrash /> Delete Account
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="mt-6 w-full py-2 bg-red-500 hover:bg-red-600 rounded text-white font-bold"
          >
            <FaSignOutAlt className="inline mr-2" />
            Logout
          </button>
        </div>

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-[#1e1e2f] p-6 rounded-lg w-full max-w-sm border border-red-500 text-center">
              <h3 className="text-lg font-bold text-red-400 mb-4">
                Confirm Delete
              </h3>
              <p className="text-gray-300 mb-4">
                Are you sure you want to permanently delete your account?
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-500 text-gray-300 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
