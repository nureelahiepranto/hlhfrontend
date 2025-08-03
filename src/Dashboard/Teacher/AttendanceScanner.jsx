import React, { useState } from "react";
import QrScanner from "react-qr-scanner";
import axios from "axios";
import { BsQrCodeScan } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AttendanceScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [attendanceMessage, setAttendanceMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successStatus, setSuccessStatus] = useState(null); // null, true, or false

  const openModal = () => {
    setIsOpen(true);
    setScanResult(null);
    setAttendanceMessage("");
  };
  const closeModal = () => setIsOpen(false);

  const handleScan = (data) => {
    if (data) {
      try {
        const parsedData = JSON.parse(data.text || data);
        if (parsedData.studentId) {
          setScanResult(parsedData);
          toast.success("QR scanned successfully!", { autoClose: 1000 });
        } else {
          toast.error("QR does not contain a valid studentId.");
        }
      } catch (err) {
        toast.error("Invalid QR Code format.");
      }
    }
  };

  const handleError = (err) => {
    console.error("QR Scanner Error:", err);
    toast.error("QR Scanner failed.");
  };

  const handleSubmitAttendance = async () => {
    if (!scanResult?.studentId) {
      toast.error("studentId not found in QR data.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No token found. Please login again.");
      return;
    }

    setSuccessStatus(null); // reset
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "https://holy-lab-hospital.onrender.com/api/attendanceR",
        { studentId: scanResult.studentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessStatus(response.data.success); // ✅ set success state
      setAttendanceMessage(response.data.message);
      toast.success(response.data.message || "Attendance marked!");

      setTimeout(() => {
        closeModal();
      }, 1500);
    } catch (error) {
      console.error("Attendance error:", error);
      const msg =
        error.response?.data?.message ||
        "Failed to mark attendance. Try again.";
      setAttendanceMessage(msg);
      setSuccessStatus(false); // ❌ failed
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold m-5 pt-5  text-rose-500">
        Scan Employee QR Code for Attendance
      </h1>

      <div className="flex items-center justify-center m-5">
        <button
          onClick={openModal}
          className="bg-green-400 text-white border-2 border-dotted px-4 py-2 rounded shadow-lg text-9xl hover:bg-green-500 transition"
        >
          <BsQrCodeScan />
        </button>
      </div>

      <div className="flex items-center justify-center">
        <h4 className="bg-orange-500 py-1 px-3 rounded-full text-white mt-10 mb-20">
          Scan Code
        </h4>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-bold">Scan QR Code</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            {/* Body */}
            <div className="mt-4">
              <QrScanner
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: "100%" }}
                constraints={{
                    video: { facingMode: { exact: "environment" } } 
                  }}
              />

              {scanResult && (
                <div className="mt-4">
                  <p className="font-semibold mb-2">Scanned Employee ID:</p>
                  <div className="bg-gray-100 rounded p-2 text-sm text-gray-800 mb-4">
                    {scanResult.studentId}
                  </div>

                  <button
                    onClick={handleSubmitAttendance}
                    disabled={isSubmitting}
                    className={`w-full py-2 rounded text-white ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {isSubmitting ? "Submitting..." : "Mark Attendance"}
                  </button>
                </div>
              )}

              {attendanceMessage && (
                <p
                  className={`mt-4 text-center font-bold ${
                    successStatus ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {attendanceMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceScanner;