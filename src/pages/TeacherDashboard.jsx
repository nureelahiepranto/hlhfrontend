import React, { useEffect, useState } from 'react';
import StudentProfileForm from '../components/StudentProfileForm.jsx';
import StudentList from '../Dashboard/Admin/StudentList.jsx';
import SearchStudent from '../Dashboard/Teacher/SearchStudent.jsx';
import AttendanceScanner from '../Dashboard/Teacher/AttendanceScanner.jsx';
import TeacherAttendanceDashboard from '../Dashboard/Teacher/TeacherAttendanceDashboard.jsx';
import DashboardFooter from '../components/DashboardFooter.jsx';
import Topbar from '../components/Topbar.jsx';
import { FaList, FaSearch, FaUserCog, FaUsers } from 'react-icons/fa';
import { IoIosToday } from "react-icons/io";
import { ImUserPlus } from "react-icons/im";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { MdPersonSearch, MdQrCodeScanner } from "react-icons/md";
import { NavLink, Route, Routes } from 'react-router-dom';
import TeacherDashboardHome from '../Dashboard/Teacher/TeacherDashboardHome.jsx';



const TeacherDashboard = () => {
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
  } bg-gray-800 text-white transition-all duration-300 ease-in-out fixed lg:relative top-0 h-screen overflow-hidden z-50`}
>
          <div className="p-4 font-bold text-lg"><h3 className="items-center justify-center flex"> Attendance<span className="text-green-500 ml-1"> Dashboard </span></h3></div>

          {/* Search Bar */}
          <div className="mb-6 relative p-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {/* Search Icon */}
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white bg-green-500 p-2 rounded-full w-7 h-7 shadow-lg cursor-pointer" />
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            <NavLink
              to="/teacher/dashboard/"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <RiDashboardHorizontalFill className="inline-block mr-2 text-red-500" /> Dashboard Home
            </NavLink>
            <NavLink
              to="/teacher/dashboard/students-list"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <FaUsers className="inline-block mr-2 text-sky-400" /> All Employee List
            </NavLink>
            <NavLink
              to="/teacher/dashboard/students-attendance-scan"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <MdQrCodeScanner className="inline-block mr-2 text-orange-500" /> Attendance Scanner
            </NavLink>
            <NavLink
              to="/teacher/dashboard/search-student"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <MdPersonSearch className="inline-block mr-2 text-blue-300" /> Search Employee
            </NavLink>
            <NavLink
              to="/teacher/dashboard/today"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <MdQrCodeScanner className="inline-block mr-2 text-red-500" /> Today Attendance
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
            <Route path="" element={<TeacherDashboardHome />} />
            <Route path="students-list" element={<StudentList />} />
            <Route path="students-attendance-scan" element={<AttendanceScanner />} />
            <Route path="search-student" element={<SearchStudent />} />
            <Route path="today" element={<TeacherAttendanceDashboard />} />
            <Route path="*" element={<div>Page Not Found (Admin)</div>} />
          </Routes>
        </div>

              {/* Dashboard Footer  */}
           
              <DashboardFooter/>

      </main>
    </div>
  )
}

export default TeacherDashboard
