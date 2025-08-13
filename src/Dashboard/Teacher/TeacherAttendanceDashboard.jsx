import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { FiSearch, FiUser, FiClock, FiCheckCircle, FiXCircle, FiSun, FiMoon } from "react-icons/fi";

const TeacherAttendanceDashboard = () => {
  const [students, setStudents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const studentRes = await axios.get("https://holy-lab-hospital.onrender.com/api/studentsD");
        const attendanceRes = await axios.get("https://holy-lab-hospital.onrender.com/api/today");
        setStudents(studentRes.data.students || []);
        setAttendanceRecords(attendanceRes.data.attendance || []);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredStudents = students.filter((student) =>
    (student.name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatUTCWithAMPM = (time) => {
    if (!time || isNaN(new Date(time))) return "N/A";
    const date = new Date(time);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const getAttendanceDetails = (studentId) => {
    const record = attendanceRecords.find((att) => att.studentId === studentId);

    if (!record) {
      return {
        status: "Absent",
        startTime: null,
        afternoon: null,
        endTime: null,
      };
    }

    return {
      status: "Present",
      startTime: record.presentStartTime || null,
      afternoon: record.afternoonAttendance || null,
      endTime: record.presentEndTime || null,
    };
  };

  const offset = currentPage * PER_PAGE;
  const currentPageStudents = filteredStudents.slice(offset, offset + PER_PAGE);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Employee Attendance Dashboard</h1>
          
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search Employee..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 mr-4">
                  <FiUser className="text-blue-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Employee</p>
                  <p className="text-2xl font-bold text-gray-800">{filteredStudents.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 mr-4">
                  <FiCheckCircle className="text-green-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Present</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {attendanceRecords.filter((record) => record.presentStartTime).length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-red-100 mr-4">
                  <FiXCircle className="text-red-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Absent</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {filteredStudents.length - attendanceRecords.filter((record) => record.presentStartTime).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {filteredStudents.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-gray-500 text-lg">No employees available for today.</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <FiSun className="mr-1" /> Start Time
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <FiClock className="mr-1" /> Afternoon
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <FiMoon className="mr-1" /> End Time
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentPageStudents.map((student) => {
                    const { status, startTime, afternoon, endTime } = getAttendanceDetails(student._id);
                    return (
                      <tr key={student._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center">
                              <FiUser className="text-rose-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{student.name || "N/A"}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status === "Present" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                            {status}
                          </span>
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${formatUTCWithAMPM(startTime) === "N/A" ? "text-red-500" : "text-black"}`}>
                          {formatUTCWithAMPM(startTime)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-bold">
                          {formatUTCWithAMPM(afternoon)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-bold">
                          {formatUTCWithAMPM(endTime)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="mt-6 flex justify-center">
                <ReactPaginate
                  previousLabel={"← Previous"}
                  nextLabel={"Next →"}
                  pageCount={Math.ceil(filteredStudents.length / PER_PAGE)}
                  onPageChange={(e) => setCurrentPage(e.selected)}
                  containerClassName="flex space-x-2 items-center"
                  pageClassName="flex"
                  pageLinkClassName="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                  activeLinkClassName="bg-rose-500 text-white border-rose-500"
                  previousClassName="flex"
                  previousLinkClassName="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                  nextClassName="flex"
                  nextLinkClassName="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                  disabledClassName="opacity-50 cursor-not-allowed"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherAttendanceDashboard;