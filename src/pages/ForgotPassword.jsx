import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa"; // Import icon
import { ToastContainer, toast } from "react-toastify";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://holy-lab-hospital.onrender.com/api/auth/forgot-password", { email });
      setMessage(response.data.message);
      setError("");
      toast.success(response.data.message)
      // ✅ Store a temporary token in localStorage
      localStorage.setItem("resetToken", "valid");

      // ✅ Redirect to ResetPassword page with email
      setTimeout(() => {
        navigate("/reset-password", { state: { email } });
      }, 2000); // Delay to show success message
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      toast.error(err.response?.data?.message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Forgot Password Card */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Forgot Password?</h2>
          <p className="text-gray-600 mt-2">
            Enter your email to receive a verification code.
          </p>
        </div>

        {/* Messages */}
        {message && (
          <p className="text-green-500 text-center bg-green-50 p-2 rounded-lg mb-4">
            {message}
          </p>
        )}
        {error && (
          <p className="text-red-500 text-center bg-red-50 p-2 rounded-lg mb-4">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSendCode} className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                className="w-full focus:outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send Verification Code
          </button>
        </form>

        {/* Back to Login Link */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-blue-600 hover:text-blue-800 transition-all duration-300"
          >
            Back to Login
          </a>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />

    </div>
  );
};

export default ForgotPassword;