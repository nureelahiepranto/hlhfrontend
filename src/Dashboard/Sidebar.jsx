// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaBars, FaUser, FaBook, FaMoneyBill } from "react-icons/fa";

// const Sidebar = ({ role }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const menus = {
//     admin: [
//       { name: "Dashboard", path: "/dashboard", icon: <FaUser /> },
//       { name: "Manage Teachers", path: "/admin/teachers", icon: <FaBook /> },
//     ],
//     teacher: [
//       { name: "Dashboard", path: "/dashboard", icon: <FaUser /> },
//       { name: "Take Attendance", path: "/teacher/attendance", icon: <FaBook /> },
//     ],
//     student: [
//       { name: "Dashboard", path: "/dashboard", icon: <FaUser /> },
//       { name: "View Attendance", path: "/student/attendance", icon: <FaBook /> },
//     ],
//     accountant: [
//       { name: "Dashboard", path: "/dashboard", icon: <FaUser /> },
//       { name: "Manage Fees", path: "/accountant/fees", icon: <FaMoneyBill /> },
//     ],
//   };

//   return (
//     <div className="flex">
//       <div className={`bg-gray-900 text-white h-screen p-5 ${isOpen ? "w-64" : "w-20"} transition-all duration-300`}>
//         <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl">
//           <FaBars />
//         </button>
//         <ul className="mt-5">
//           {menus[role]?.map((item) => (
//             <li key={item.name} className="p-2 hover:bg-gray-700 rounded">
//               <Link to={item.path} className="flex items-center gap-3">
//                 {item.icon} <span className={`${isOpen ? "block" : "hidden"}`}>{item.name}</span>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
