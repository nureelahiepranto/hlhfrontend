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
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4 text-rose-500">
        Scan Employee QR Code for Attendance
      </h1>

      <div className="flex items-center justify-center">
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
                    attendanceMessage.toLowerCase().includes("success")
                      ? "text-green-600"
                      : "text-red-600"
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


// import React, { useState } from "react";
// import QrScanner from "react-qr-scanner"; // Ensure you have the correct package installed
// import axios from "axios";
// import { BsQrCodeScan } from "react-icons/bs";
// import { toast, ToastContainer } from "react-toastify"; // Import Toastify
// import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

// const AttendanceScanner = () => {
//   const [scanResult, setScanResult] = useState(null);
//   const [attendanceMessage, setAttendanceMessage] = useState("");
//   const [isOpen, setIsOpen] = useState(false);

//   const openModal = () => setIsOpen(true);
//   const closeModal = () => setIsOpen(false);

//   const handleScan = async (data) => {
//     if (data) {
//       try {
//         const parsedData = JSON.parse(data.text || data); // Parse QR code data
//         setScanResult(parsedData);
//         const token = localStorage.getItem("token");
//         if (!token) {
//           console.error("🚨 No token found!");
//           toast.error("You are not logged in. Please log in again.");
//           return;
//         }
//         const response = await axios.post("https://holy-lab-hospital.onrender.com/api/attendanceR", {
//           studentId: parsedData.studentId,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setAttendanceMessage(response.data.message);

//         // Show success toast
//         toast.success("Attendance marked successfully!", {
//           position: "top-right",
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });

//         // Close the modal after a short delay
//         setTimeout(() => {
//           closeModal();
//         }, 1000);
//       } catch (error) {
//         console.error("Error processing QR code or marking attendance:", error);
//         setAttendanceMessage(
//           error.response?.data?.message || "Failed to process QR code or mark attendance."
//         );

//         // Show error toast
//         toast.error("Failed to mark attendance. Please try again!", {
//           position: "top-right",
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//       }
//     }
//   };

  
//   const handleError = (err) => {
//     console.error("QR Scanner Error:", err);
//   };

//   return (
//     <div className="p-6">
//       <ToastContainer /> {/* Toast Container */}
//       <h1 className="text-2xl font-bold mb-4 text-rose-500 ">Scan Employee QR Code for Attendance</h1>

//       {/* Button to Open Modal */}
//       <div className="flex items-center justify-center">
//         <button
//           onClick={openModal}
//           className="bg-green-400 text-white border-2 border-dotted px-4 py-2 rounded shadow-lg shadow-blue-500/50 hover:bg-green-500 transition text-9xl"
//         >
//           <BsQrCodeScan />
//         </button>
//       </div>
      
//       <div className="flex items-center justify-center">
//         <h4 className=" bg-orange-500 py-1 px-3 rounded-full text-white mt-10 mb-20">Scan Code</h4>
//       </div>


//       {/* Modal */}
//       {isOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-lg p-6 shadow-lg w-96">
//             {/* Modal Header */}
//             <div className="flex justify-between items-center border-b pb-3">
//               <h2 className="text-xl font-bold">Scan QR Code</h2>
//               <button
//                 onClick={closeModal}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 &times;
//               </button>
//             </div>

//             {/* Modal Body */}
//             <div className="mt-4">
//             <QrScanner
//                 delay={300}
//                 onError={handleError}
//                 onScan={handleScan}
//                 style={{ width: "100%" }}
//                 // constraints={{
//                 //   video: { facingMode: { exact: "environment" } } 
//                 // }}
//               />

//               {scanResult && (
//                 <div className="mt-4">
//                   <p>
//                     <strong>Employee Details:</strong>
//                   </p>
//                   <ul>
//                     <li>Student ID: {scanResult.studentId}</li>
//                     <li>Roll Number: {scanResult.rollNumber}</li>
//                     <li>Class: {scanResult.className}</li>
//                   </ul>
//                 </div>
//               )}

//               {attendanceMessage && (
//                 <div className="mt-4">
//                   <p>
//                     <strong>Attendance Status:</strong> <span
//       className={
//         attendanceMessage.toLowerCase().includes("success")
//           ? "text-green-500 font-bold"
//           : "text-red-500 font-bold"
//       }
//     >
//       {attendanceMessage}
//     </span>
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//        {scanResult && (
//                 <div className="mt-4">
//                   <p>
//                     <strong>Student Details:</strong>
//                   </p>
//                   <ul>
//                     <li>Student ID: {scanResult.studentId}</li>
//                     <li>Roll Number: {scanResult.rollNumber}</li>
//                     <li>{scanResult.className}</li>
//                   </ul>
//                 </div>
//               )}

//               {attendanceMessage && (
//                 <div className="mt-4">
//                   <p>
//                     <strong>Attendance Status:</strong> <span
//       className={
//         attendanceMessage.toLowerCase().includes("success")
//           ? "text-green-500 font-bold"
//           : "text-red-500 font-bold"
//       }
//     >
//       {attendanceMessage}
//     </span>
//                   </p>
//                 </div>
//               )}

//     </div>
//   );
// };

// export default AttendanceScanner;








// // import React, { useState } from "react";
// // import QrScanner from "react-qr-scanner"; // Ensure you have the correct package installed
// // import axios from "axios";

// // const AttendanceScanner = () => {
// //   const [scanResult, setScanResult] = useState(null);
// //   const [attendanceMessage, setAttendanceMessage] = useState("");

// //   const handleScan = async (data) => {
// //     if (data) {
// //       try {
// //         // `data` is an object with the QR code data, it contains the `text` property with the scanned result
// //         const parsedData = JSON.parse(data.text || data); // Parse the text (assuming it's a JSON string)

// //         // Set the scan result to state
// //         setScanResult(parsedData);

// //         // Send parsed data to the backend for attendance
// //         const response = await axios.post("https://holy-lab-hospital.onrender.com/api/attendanceR", {
// //           studentId: parsedData.studentId,
// //           rollNumber: parsedData.rollNumber,
// //           className: parsedData.className,
// //         });

// //         // Set attendance status message
// //         setAttendanceMessage(response.data.message);
// //       } catch (error) {
// //         console.error("Error processing QR code or marking attendance:", error);
// //         setAttendanceMessage(
// //           error.response?.data?.message || "Failed to process QR code or mark attendance."
// //         );
// //       }
// //     }
// //   };

// //   const handleError = (err) => {
// //     console.error("QR Scanner Error:", err);
// //   };

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-2xl font-bold mb-4">Scan Student QR Code for Attendance</h1>

// //       <QrScanner
// //         delay={300}
// //         onError={handleError}
// //         onScan={handleScan}
// //         style={{ width: "50%" }}
// //       />

// //       {scanResult && (
// //         <div className="mt-4">
// //           <p>
// //             <strong>Student Details:</strong>
// //           </p>
// //           <ul>
// //             {/* Access specific properties from the parsedData object */}
// //             <li>Student ID: {scanResult.studentId}</li>
// //             <li>Name: {scanResult.name}</li>
// //             <li>Roll Number: {scanResult.rollNumber}</li>
// //             <li>Class: {scanResult.className}</li>
// //           </ul>
// //         </div>
// //       )}

// //       {attendanceMessage && (
// //         <div className="mt-4">
// //           <p>
// //             <strong>Attendance Status:</strong> {attendanceMessage}
// //           </p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default AttendanceScanner;
