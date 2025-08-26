import React, { useEffect, useState } from "react";
import { NavLink, Routes, Route, } from "react-router-dom";
import DashboardHome from "../Dashboard/Admin/DashboardHome.jsx";
import ManageTeachers from "../Dashboard/Admin/ManageTeachers.jsx";
import StudentIDCard from "../Dashboard/Admin/StudentIDCard.jsx";
import AttendanceDownloadPDF from "../Dashboard/Admin/AttendanceDownloadPDF.jsx";
import StudentList from "../Dashboard/Admin/StudentList.jsx";
import { FaUserCog, FaUsers, FaChalkboardTeacher, FaIdCard, FaDownload } from "react-icons/fa";
import Topbar from "../components/Topbar.jsx";
import DashboardFooter from "../components/DashboardFooter.jsx";
import TeacherAttendanceDashboard from "../Dashboard/Teacher/TeacherAttendanceDashboard.jsx";
import {  MdQrCodeScanner } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import { FaRegAddressCard } from "react-icons/fa6";
import { FaPeopleRoof } from "react-icons/fa6";
import ApprovedAttendance from "../Dashboard/Admin/ApprovedAttendance.jsx";
import StudentProfileForm from "../components/StudentProfileForm.jsx";
import OfficesManagesmant from "../Dashboard/Admin/OfficesManagesmant.jsx";

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Sync sidebar state with screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true); // Open sidebar on lg screens
      } else {
        setSidebarOpen(false); // Close sidebar on sm screens
      }
    };

    // Set initial state based on screen size
    handleResize();

    // Add event listener for screen size changes
    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle the sidebar state
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
  className={`${
    isSidebarOpen ? "w-64" : "w-0"
  } bg-gray-800 text-white transition-all duration-300 ease-in-out fixed lg:relative top-0  overflow-hidden z-50`}
>
          <div className="p-4 font-bold text-lg"><h3 className="items-center justify-center flex"> Admin<span className="text-red-400 ml-1"> Dashboard </span></h3></div>

          {/* Navigation */}
          <nav className="space-y-1">
            <NavLink
              to="/admin-dashboard/"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <FaUserCog className="inline-block mr-2 text-red-500" /> Dashboard Home
            </NavLink>
            <NavLink
              to="/admin-dashboard/OfficesManagement"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <FaPeopleRoof className="inline-block mr-2 text-green-400" /> Office Management
            </NavLink>
            <NavLink
              to="/admin-dashboard/studentsList"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <FaUsers className="inline-block mr-2 text-sky-500" /> All Employee List
            </NavLink>
            <NavLink
              to="/admin-dashboard/teachers"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <FaChalkboardTeacher className="inline-block mr-2 text-orange-500" /> Manage Attendance Person
            </NavLink>
            <NavLink
              to="/admin-dashboard/ApprovedAttendance"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <FcApproval className="inline-block mr-2 text-green-500" /> Approved Attendance
            </NavLink>
            <NavLink
              to="/admin-dashboard/student-from"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <FaIdCard className="inline-block mr-2 text-blue-500" /> Employee From
            </NavLink>

            <NavLink
              to="/admin-dashboard/student-id"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <FaRegAddressCard className="inline-block mr-2 text-green-500" /> Employee ID Card
            </NavLink>

            <NavLink
              to="/admin-dashboard/attendance-today"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <MdQrCodeScanner className="inline-block mr-2 text-red-500" /> Today Attendance
            </NavLink>
            <NavLink
              to="/admin-dashboard/attendance-sheet"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <FaDownload className="inline-block mr-2 text-green-500" /> Download Attendance
            </NavLink>
           
            

          </nav>
        </aside>


      {/* Main Content */}
      <main className={`flex-1 ${isSidebarOpen ? "lg:ml-0 ml-64" : "ml-0"} transition-all duration-300 ease-in-out`}>
              
            {/* Dashbord Topbar  */}
          <Topbar toggleSidebar={toggleSidebar} />

        {/* Content Area */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="OfficesManagement" element={<OfficesManagesmant />} />
            <Route path="studentsList" element={<StudentList />} />
            <Route path="teachers" element={<ManageTeachers />} />
            <Route path="ApprovedAttendance" element={<ApprovedAttendance />} />
            <Route path="student-from" element={<StudentProfileForm />} />
            <Route path="student-id" element={<StudentIDCard />} />
            <Route path="attendance-today" element={<TeacherAttendanceDashboard />} />
            <Route path="attendance-sheet" element={<AttendanceDownloadPDF />} />

            <Route path="*" element={<div>Page Not Found (Admin)</div>} />
          </Routes>
        </div>

              {/* Dashboard Footer  */}
            <DashboardFooter/>
      </main>
    </div>
  );
};
export default AdminDashboard;
