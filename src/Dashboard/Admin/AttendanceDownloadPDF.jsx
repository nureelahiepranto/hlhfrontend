import React, { useState } from "react";
import axios from "axios";
import { format } from "date-fns";

const AttendanceDownloadPDF = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch attendance data
  const fetchAttendanceData = async () => {
    if (!selectedDate) {
      setError("Please select a date.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`https://holy-lab-hospital.onrender.com/api/api/attendance/${selectedDate}`);
      setAttendanceData(response.data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      setError("Failed to fetch attendance data.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Download PDF
  const downloadAttendancePDF = async () => {
    if (!selectedDate) {
      setError("Please select a date.");
      return;
    }

    try {
      const response = await axios.get(`https://holy-lab-hospital.onrender.com/api/api/attendance/download/${selectedDate}`, {
        responseType: "blob", // Important for downloading files
      });

      // ✅ Create a download link and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Attendance_Report_${selectedDate}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading PDF:", error);
      setError("Failed to download attendance report.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Download Attendance Report</h1>

      {/* Date Picker */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Select Date</label>
        <input
          type="date"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Fetch Button */}
      <button
        onClick={fetchAttendanceData}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 mb-4"
      >
        {loading ? "Fetching..." : "Fetch Attendance Data"}
      </button>

      {/* Download Button */}
      {attendanceData.length > 0 && (
        <button
          onClick={downloadAttendancePDF}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300 mb-4"
        >
          Download PDF
        </button>
      )}

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Attendance Data Table */}
      {attendanceData.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Attendance Data for {format(new Date(selectedDate), "MMMM d, yyyy")}</h2>
          <table className="w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Start Time</th>
                <th className="px-4 py-2">End Time</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((attendance) => (
                <tr key={attendance._id} className="border-b">
                  <td className="px-4 py-2 text-center">{attendance.studentId?.userId?.name || "N/A"}</td>
                  <td className="px-4 py-2 text-center">{attendance.presentStartTime ? new Date(attendance.presentStartTime).toLocaleTimeString() : "N/A"}</td>
                  <td className="px-4 py-2 text-center">{attendance.presentEndTime ? new Date(attendance.presentEndTime).toLocaleTimeString() : "N/A"}</td>
                  <td className="px-4 py-2 text-center">Present</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AttendanceDownloadPDF;
