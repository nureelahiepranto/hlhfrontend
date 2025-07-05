import React from "react";
import { Link } from "react-router-dom";
import { FaUserCog, FaUsers, FaChalkboardTeacher, FaMoneyBill, FaSignOutAlt } from "react-icons/fa";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div
      className={`bg-gray-800 text-white w-64 space-y-6 py-6 px-4 absolute lg:relative transition-all duration-300 ${
        sidebarOpen ? "left-0" : "-left-64"
      } lg:left-0 top-0 h-screen`}
    >
      <h2 className="text-2xl font-semibold text-center">Admin Panel</h2>
      <nav>
        <Link to="/admin/dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          <FaUserCog className="inline-block mr-2" /> Dashboard
        </Link>
        <Link to="/admin/teachers" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          <FaChalkboardTeacher className="inline-block mr-2" /> Manage Teachers
        </Link>
        <Link to="/admin/students" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          <FaUsers className="inline-block mr-2" /> Manage Students
        </Link>
        <Link to="/admin/finance" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          <FaMoneyBill className="inline-block mr-2" /> Finance
        </Link>
        <button className="block w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-red-600 mt-4">
          <FaSignOutAlt className="inline-block mr-2" /> Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;



// import React from 'react';

// function Sidebar({ setCurrentTab, isOpen, toggleSidebar  }) {
//   return (
//     <div className={`fixed top-0 left-0 h-full bg-blue-700 text-white w-64 transform ${
//         isOpen ? 'translate-x-0' : '-translate-x-full'
//       } lg:translate-x-0 lg:block transition-transform duration-300 ease-in-out`}>
//       {/* Close button (only for small screens) */}
//       <button
//         className="block md:hidden p-4 text-right"
//         onClick={toggleSidebar}
//       >
//         {/* <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           className="w-6 h-6"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M6 18L18 6M6 6l12 12"
//           />
//         </svg> */}
//       </button>

//     <div className="w-64 bg-blue-600 text-white h-screen p-4">
//       <h2 className="text-2xl font-bold mb-4">Teacher Dashboard</h2>
//       <ul>
//         <li
//           onClick={() => setCurrentTab('dashboard')}
//           className="cursor-pointer py-2 px-4 hover:bg-blue-700 rounded"
//         >
//           Dashboard
//         </li>
//         <li
//           onClick={() => setCurrentTab('add-student')}
//           className="cursor-pointer py-2 px-4 hover:bg-blue-700 rounded"
//         >
//           Add Student
//         </li>
//         <li
//           onClick={() => setCurrentTab('attendance')}
//           className="cursor-pointer py-2 px-4 hover:bg-blue-700 rounded"
//         >
//           Scan Attendance
//         </li>
//         <li
//           onClick={() => setCurrentTab('attendance-dashboard')}
//           className="cursor-pointer py-2 px-4 hover:bg-blue-700 rounded"
//         >
//           Attendance Dashboard
//         </li>
//         <li
//           onClick={() => setCurrentTab('student-list')}
//           className="cursor-pointer py-2 px-4 hover:bg-blue-700 rounded"
//         >
//           View Students
//         </li>
//         <li
//           onClick={() => setCurrentTab('search-student')}
//           className="cursor-pointer py-2 px-4 hover:bg-blue-700 rounded"
//         >
//           Search Student
//         </li>
//       </ul>
//     </div>
//     </div>
//   );
// }

// export default Sidebar;
