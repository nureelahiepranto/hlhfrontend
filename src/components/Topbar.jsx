import React, { useEffect, useState } from "react";
import { FaBars, FaHome, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Topbar = ({ toggleSidebar }) => { // Accept toggleSidebar as a prop
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token from localStorage
    navigate("/"); // Redirect to login page
  };

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get("https://holy-lab-hospital.onrender.com/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }, // Include token
        });

        console.log("User Data:", response.data); // Debugging
        setUser(response.data.user);
        // setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error.response?.data?.message || error.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      {/* Top Bar */}
      <div className="bg-white shadow-md p-4 flex justify-between items-center">
        {/* Mobile Toggle Button */}
        <button
          onClick={toggleSidebar} // Use the passed toggleSidebar function
          className="lg:hidden text-gray-600 focus:outline-none p-2 rounded hover:text-red-500 hover:bg-slate-300"
        >
          <FaBars className="h-6 w-6" />
        </button>

        {/* User Profile & Logout */}
        <div className="relative ">
        <button
          className="flex items-center space-x-2 gap-2"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {/* Name should be first on mobile (sm) and last on larger screens (lg) */}
          <span className="font-bold text-rose-400 order-1 lg:order-2">{user?.name}</span>

          {/* Profile Image should be last on mobile (sm) and first on larger screens (lg) */}
          <img
            src={
              user?.profileImage ||
              "https://img.freepik.com/free-vector/young-man-with-glasses-avatar_1308-175763.jpg?t=st=1738485358~exp=1738488958~hmac=b9ecd80e4325f35d761643bb43ffa7eb4bd7f0c7190abb3256126640507e6b2f&w=740"
            }
            alt="User Avatar"
            className="w-10 h-10 rounded-full border order-2 lg:order-1"
          />
        </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40 z-50 ">
              
              <button
                onClick={() => navigate("/")}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <FaHome className="mr-2 z-50" /> Home
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <FaSignOutAlt className="mr-2 z-50" /> Logout
              </button>           
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
// import React, { useEffect, useState } from 'react'
// import {  FaBars, FaSignOutAlt } from "react-icons/fa";
// import { useAuth } from "../context/AuthContext";
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';
// const Topbar = () => {
//     const [isSidebarOpen, setSidebarOpen] = useState(true); // Track sidebar state
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const [user, setUser] = useState(null);
//     const navigate = useNavigate();
  
//     // Toggle the sidebar state
//     const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  
//     // Handle logout
//     const handleLogout = () => {
//       localStorage.removeItem("token"); // Clear token from localStorage
//       navigate("/"); // Redirect to login page
//     };
//     useEffect(() => {
//       const fetchUser = async () => {
//         try {
//           const token = localStorage.getItem("token"); // ✅ Get token from localStorage
//           if (!token) {
//             console.error("No token found");
//             return;
//           }
    
//           const response = await axios.get("https://holy-lab-hospital.onrender.com/api/auth/me", {
//             headers: { Authorization: `Bearer ${token}` }, // ✅ Include token
//           });
    
//           console.log("User Data:", response.data); // Debugging
//           setUser(response.data.user);
//         } catch (error) {
//           console.error("Error fetching user:", error.response?.data?.message || error.message);
//         }
//       };
    
//       fetchUser();
//     }, []);
//   return (
// <div>
//     {/* Top Bar */}
//     <div className="bg-white shadow-md p-4 flex justify-between items-center">
//           {/* Mobile Toggle Button */}
//           <button
//             onClick={toggleSidebar}
//             className="lg:hidden text-gray-600 focus:outline-none"
//           >
//             <FaBars className="h-6 w-6" />
//           </button>

//           {/* User Profile & Logout */}
//       <div className="relative">
//         <button
//           className="flex items-center space-x-2"
//           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//         >
//           <img
//             src={user?.profileImage || "https://img.freepik.com/free-vector/young-man-with-glasses-avatar_1308-175763.jpg?t=st=1738485358~exp=1738488958~hmac=b9ecd80e4325f35d761643bb43ffa7eb4bd7f0c7190abb3256126640507e6b2f&w=740"} // Placeholder image
//             alt="User Avatar"
//             className="w-10 h-10 rounded-full border"
//           />
//           <span className="hidden sm:inline font-bold pl-5 text-sky-600">{user?.name}</span>
//         </button>

//         {/* Dropdown Menu */}
//         {isDropdownOpen && (
//           <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40">
//             <button
//               onClick={handleLogout}
//               className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
//             >
//               <FaSignOutAlt className="mr-2" /> Logout
//             </button>
//           </div>
//         )}
//       </div>
//         </div>
// </div>
//   )
// }

// export default Topbar