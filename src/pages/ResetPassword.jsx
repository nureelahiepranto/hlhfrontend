import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEnvelope, FaKey, FaCheckCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const resetToken = localStorage.getItem("resetToken");
    if (!resetToken) {
      navigate("/unauthorized");
    } else if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://holy-lab-hospital.onrender.com/api/auth/reset-password", { email, code, newPassword });
      setMessage(response.data.message);
      setError("");
      toast.success(response.data.message)

      localStorage.removeItem("resetToken");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      toast.error(err.response?.data?.message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Reset Password</h2>
        {message && (
          <div className="flex items-center justify-center mb-4">
            <FaCheckCircle className="text-green-500 mr-2" />
            <p className="text-green-500 text-center">{message}</p>
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center mb-4">
            <p className="text-red-500 text-center">{error}</p>
          </div>
        )}
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                className="w-full pl-10 pr-4 py-3 border rounded-lg bg-gray-50 cursor-not-allowed"
                value={email}
                readOnly
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Verification Code</label>
            <div className="relative">
              <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">New Password</label>
            <div className="relative">
              <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
          >
            Reset Password
          </button>
        </form>
      </div>

       {/* Toast Container */}
        <ToastContainer />

    </div>
  );
};

export default ResetPassword;