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


// import React, { useState, useRef } from "react";
// import QrScanner from "react-qr-scanner";
// import axios from "axios";
// import { BsQrCodeScan, BsX, BsCheckCircle, BsExclamationCircle } from "react-icons/bs";
// import { FiUserCheck, FiClock } from "react-icons/fi";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AttendanceScanner = () => {
//   const [scanResult, setScanResult] = useState(null);
//   const [attendanceMessage, setAttendanceMessage] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [successStatus, setSuccessStatus] = useState(null);
//   const [scanActive, setScanActive] = useState(true);
//   const scannerRef = useRef(null);

//   const openModal = () => {
//     setIsOpen(true);
//     setScanResult(null);
//     setAttendanceMessage("");
//     setScanActive(true);
//     setSuccessStatus(null);
//   };

//   const closeModal = () => {
//     setIsOpen(false);
//     if (scannerRef.current) {
//       scannerRef.current.stopCamera();
//     }
//   };

//   const handleScan = (data) => {
//     if (data && scanActive) {
//       try {
//         const parsedData = JSON.parse(data.text || data);
//         if (parsedData.studentId) {
//           setScanResult(parsedData);
//           setScanActive(false); // Stop scanning after successful scan
//           toast.success("Employee identified!", {
//             icon: <FiUserCheck className="text-xl" />,
//             autoClose: 1500
//           });
//         } else {
//           toast.error("Invalid employee QR code");
//         }
//       } catch (err) {
//         toast.error("Invalid QR format");
//       }
//     }
//   };

//   const handleError = (err) => {
//     console.error("Scanner error:", err);
//     toast.error("Scanner error. Please try again.");
//   };

//   const handleSubmitAttendance = async () => {
//     if (!scanResult?.studentId) {
//       toast.error("No employee data found");
//       return;
//     }

//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Authentication required");
//       return;
//     }

//     setIsSubmitting(true);
//     setSuccessStatus(null);

//     try {
//       const response = await axios.post(
//         "https://holy-lab-hospital.onrender.com/api/attendanceR",
//         { studentId: scanResult.studentId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setSuccessStatus(true);
//       setAttendanceMessage(response.data.message || "Attendance recorded!");
//       toast.success("Attendance recorded!", {
//         icon: <BsCheckCircle className="text-xl text-green-500" />,
//         autoClose: 2000
//       });

//       setTimeout(closeModal, 2000);
//     } catch (error) {
//       console.error("Error:", error);
//       const msg = error.response?.data?.message || "Attendance failed";
//       setAttendanceMessage(msg);
//       setSuccessStatus(false);
//       toast.error(msg, {
//         icon: <BsExclamationCircle className="text-xl text-red-500" />,
//         autoClose: 3000
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const rescan = () => {
//     setScanResult(null);
//     setAttendanceMessage("");
//     setSuccessStatus(null);
//     setScanActive(true);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
//       <ToastContainer 
//         position="top-center"
//         toastClassName="shadow-lg rounded-xl"
//         progressClassName="bg-gradient-to-r from-blue-500 to-purple-500"
//       />
      
//       <div className="max-w-4xl mx-auto">
//         {/* App Header */}
//         <header className="mb-8 text-center">
//           <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//             Employee Attendance System
//           </h1>
//           <p className="mt-2 text-gray-600">Scan QR codes to record daily attendance</p>
//         </header>

//         {/* Main Scanner Card */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
//           <div className="p-6 md:p-8">
//             <div className="flex flex-col items-center space-y-8">
//               {/* Scanner Button with Animated Border */}
//               <div className="relative">
//                 <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-spin-slow opacity-20 blur-md"></div>
//                 <button
//                   onClick={openModal}
//                   className="relative bg-gradient-to-br from-blue-500 to-purple-600 text-white p-10 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 z-10"
//                 >
//                   <BsQrCodeScan className="text-7xl" />
//                 </button>
//               </div>

//               {/* Instructions */}
//               <div className="text-center space-y-4">
//                 <div className="inline-flex items-center bg-blue-100 text-blue-800 py-2 px-6 rounded-full shadow-sm">
//                   <FiClock className="mr-2" />
//                   <span className="font-medium">Tap to record attendance</span>
//                 </div>
//                 <p className="text-gray-600 max-w-md">
//                   Point your camera at the employee's QR code to automatically capture their attendance record.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Scanner Modal */}
//       {isOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 p-4 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all duration-300 scale-95 hover:scale-100">
//             {/* Modal Header */}
//             <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-5 text-white flex justify-between items-center">
//               <h2 className="text-xl font-bold flex items-center">
//                 <BsQrCodeScan className="mr-2" />
//                 QR Scanner
//               </h2>
//               <button
//                 onClick={closeModal}
//                 className="p-1 rounded-full hover:bg-white/10 transition-colors"
//               >
//                 <BsX className="text-2xl" />
//               </button>
//             </div>

//             {/* Modal Body */}
//             <div className="p-5">
//               {/* Scanner Area */}
//               <div className="relative border-4 border-dashed border-blue-100 rounded-xl overflow-hidden bg-gray-900">
//                 {scanActive ? (
//                   <QrScanner
//                     ref={scannerRef}
//                     delay={300}
//                     onError={handleError}
//                     onScan={handleScan}
//                     style={{ width: "100%", height: "auto" }}
//                     constraints={{
//                       video: { facingMode: { exact: "environment" } } 
//                     }}
//                   />
//                 ) : (
//                   <div className="flex items-center justify-center h-64 bg-black/50">
//                     <p className="text-white font-medium">Scan completed</p>
//                   </div>
//                 )}
                
//                 {/* Scanner Frame Guide */}
//                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                   <div className="border-2 border-white/80 rounded-lg w-64 h-64 relative">
//                     <div className="absolute -top-1 -left-1 w-10 h-10 border-t-4 border-l-4 border-blue-400"></div>
//                     <div className="absolute -top-1 -right-1 w-10 h-10 border-t-4 border-r-4 border-blue-400"></div>
//                     <div className="absolute -bottom-1 -left-1 w-10 h-10 border-b-4 border-l-4 border-blue-400"></div>
//                     <div className="absolute -bottom-1 -right-1 w-10 h-10 border-b-4 border-r-4 border-blue-400"></div>
//                   </div>
//                 </div>
//               </div>

//               {/* Scan Results */}
//               {scanResult && (
//                 <div className="mt-6 space-y-5">
//                   <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl">
//                     <p className="text-sm font-medium text-blue-600">EMPLOYEE ID</p>
//                     <p className="text-xl font-bold text-blue-800 mt-1">{scanResult.studentId}</p>
//                   </div>

//                   <div className="flex space-x-3">
//                     <button
//                       onClick={rescan}
//                       className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium text-gray-800 transition-colors"
//                     >
//                       Rescan
//                     </button>
//                     <button
//                       onClick={handleSubmitAttendance}
//                       disabled={isSubmitting}
//                       className={`flex-1 py-3 rounded-lg font-medium text-white transition-all ${
//                         isSubmitting
//                           ? "bg-blue-400 cursor-not-allowed"
//                           : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-md"
//                       }`}
//                     >
//                       {isSubmitting ? (
//                         <span className="flex items-center justify-center">
//                           <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                           </svg>
//                           Processing...
//                         </span>
//                       ) : (
//                         "Confirm Attendance"
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Status Message */}
//               {attendanceMessage && (
//                 <div className={`mt-5 p-4 rounded-xl border ${
//                   successStatus 
//                     ? "bg-green-50 border-green-200 text-green-800" 
//                     : "bg-red-50 border-red-200 text-red-800"
//                 }`}>
//                   <div className="flex items-center">
//                     {successStatus ? (
//                       <BsCheckCircle className="text-xl mr-3 text-green-500" />
//                     ) : (
//                       <BsExclamationCircle className="text-xl mr-3 text-red-500" />
//                     )}
//                     <p className="font-medium">{attendanceMessage}</p>
//                   </div>
//                 </div>
//               )}

//               {/* Help Text */}
//               {!scanResult && (
//                 <div className="mt-5 text-center text-gray-500 text-sm">
//                   <p>Align the QR code within the frame to scan</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AttendanceScanner;