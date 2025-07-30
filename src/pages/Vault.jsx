import { useState, useEffect } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaCopy,
  FaCheckCircle,
  FaTrash,
  FaEdit,
  FaPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Unauthorized from "../features/auth/Unauthorized.jsx";

export default function Vault() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [visibleIds, setVisibleIds] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [passwords, setPasswords] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPasswordData, setNewPasswordData] = useState({
    serviceName: "",
    username: "",
    password: "",
  });

  //verify that user is login
  useEffect(() => {
    const verifyUser = async () => {
      // console.log("hello");

      try {
        const res = await axios.post("/api/users/verify", null, {
          withCredentials: true,
        });

        // ✅ Successful respons

        if (res.data.message === "Success") {
          setIsLoggedIn(true);
        }
      } catch (error) {
        // ❌ Handle errors
        if (error.response) {
          console.error("❌ Verification failed:", error.response.data.message);
          setIsLoggedIn(false);
        } else {
          console.error("❌ Network error or unexpected error:", error.message);
          setIsLoggedIn(false);
        }
      }
    };

    verifyUser();
  }, [isLoggedIn]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/passwords/show/user-passwords");
        setPasswords(res.data.data);
      } catch (error) {
        console.error("❌ Error fetching passwords:", error.message);
      }
    })();
  }, [editData, deleteId]);

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

  const handleEdit = (entry) => {
    setEditData(entry);
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    
    try {
      await axios.delete(`/api/passwords/delete/${deleteId}`);
      setPasswords(passwords.filter((item) => item.id !== deleteId));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("❌ Error deleting password:", error.message);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const id = editData.id || editData._id
      await axios.put(
        `/api/passwords/update-password/${id}`,
        editData
      );
      setPasswords((prev) =>
        prev.map((item) => (item.id === editData.id ? editData : item))
      );
      setShowEditModal(false);
    } catch (error) {
      console.error("❌ Error updating password:", error.message);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/passwords/add", newPasswordData);
      setPasswords((prev) => [...prev, res.data.data]);
      setShowAddModal(false);

      setNewPasswordData({ serviceName: "", username: "", password: "" });
    } catch (error) {
      console.error("❌ Error adding password:", error.message);
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4 py-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-transparent bg-clip-text">
                Your Password Vault 🔐
              </h1>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white rounded-md hover:opacity-90 transition"
              >
                <FaPlus /> Add
              </button>
            </div>

            {passwords.length === 0 ? (
              <div className="text-center py-20 text-gray-400 text-lg">
                You haven't saved any passwords yet. Click "Add" to get started!
              </div>
            ) : (
              <div className="space-y-6">
                {passwords.map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-white/5 backdrop-blur-lg border border-gray-700 rounded-xl p-6 shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-6"
                  >
                    <div>
                      <h2 className="text-xl font-semibold text-cyan-400">
                        {entry.serviceName}
                      </h2>
                      <p className="text-gray-300 text-sm">
                        Username: {entry.username}
                      </p>
                      <p className="text-gray-300 text-sm">
                        Password:{" "}
                        {visibleIds.includes(entry.id)
                          ? entry.password
                          : "••••••••"}
                      </p>
                    </div>

                    <div className="flex gap-4 text-lg">
                      <button
                        onClick={() => toggleVisibility(entry.id)}
                        title="Show/Hide Password"
                        className="hover:text-cyan-400 transition"
                      >
                        {visibleIds.includes(entry.id) ? (
                          <FaEyeSlash />
                        ) : (
                          <FaEye />
                        )}
                      </button>
                      <button
                        onClick={() =>
                          copyToClipboard(entry.password, entry.id)
                        }
                        title="Copy Password"
                        className="hover:text-green-400 transition"
                      >
                        {copiedId === entry.id ? (
                          <FaCheckCircle className="text-green-400" />
                        ) : (
                          <FaCopy />
                        )}
                      </button>
                      <button
                        onClick={() => handleEdit(entry)}
                        title="Edit"
                        className="hover:text-yellow-400 transition"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        title="Delete"
                        className="hover:text-red-500 transition"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Edit Modal */}
          {showEditModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-[#1e1e2f] p-6 rounded-lg w-full max-w-md border border-cyan-500 shadow-2xl">
                <h2 className="text-xl font-bold mb-4 text-cyan-400">
                  ✏️ Edit Password
                </h2>
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="serviceName"
                    value={editData.serviceName}
                    onChange={(e) =>
                      setEditData({ ...editData, serviceName: e.target.value })
                    }
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
                    placeholder="Service"
                  />
                  <input
                    type="text"
                    name="username"
                    value={editData.username}
                    onChange={(e) =>
                      setEditData({ ...editData, username: e.target.value })
                    }
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
                    placeholder="Username"
                  />
                  <input
                    type="text"
                    name="password"
                    value={editData.password}
                    onChange={(e) =>
                      setEditData({ ...editData, password: e.target.value })
                    }
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
                    placeholder="Password"
                  />
                  <div className="flex justify-between gap-4">
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-gradient-to-r from-green-400 to-cyan-500 text-white rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setShowEditModal(false)}
                      type="button"
                      className="flex-1 py-2 border border-gray-600 rounded text-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Delete Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
              <div className="bg-[#1e1e2f] p-6 rounded-lg w-full max-w-sm border border-red-500 text-center">
                <h3 className="text-lg font-bold text-red-400 mb-4">
                  Are you sure you want to delete this password?
                </h3>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                  >
                    Delete
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

          {/* Add Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
              <div className="bg-[#1e1e2f] p-6 rounded-lg w-full max-w-md border border-cyan-500 shadow-2xl">
                <h2 className="text-xl font-bold mb-4 text-cyan-400">
                  ➕ Add New Password
                </h2>
                <form onSubmit={handleAddSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Service"
                    value={newPasswordData.serviceName}
                    onChange={(e) =>
                      setNewPasswordData({
                        ...newPasswordData,
                        serviceName: e.target.value,
                      })
                    }
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Username"
                    value={newPasswordData.username}
                    onChange={(e) =>
                      setNewPasswordData({
                        ...newPasswordData,
                        username: e.target.value,
                      })
                    }
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Password"
                    value={newPasswordData.password}
                    onChange={(e) =>
                      setNewPasswordData({
                        ...newPasswordData,
                        password: e.target.value,
                      })
                    }
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
                    required
                  />
                  <div className="flex justify-between gap-4">
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-gradient-to-r from-green-400 to-cyan-500 text-white rounded"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 py-2 border border-gray-600 text-gray-300 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Unauthorized />
      )}
    </>
  );
}
