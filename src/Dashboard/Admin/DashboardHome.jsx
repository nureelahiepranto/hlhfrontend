import React, { useEffect, useState } from "react";
import { FaUsers, FaChalkboardTeacher, FaMoneyBill, FaClipboardList } from "react-icons/fa";

const DashboardHome = () => {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    revenue: 0,
    attendance: 0,
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch dashboard stats
    fetch("https://holy-lab-hospital.onrender.com/api/admin/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((error) => console.error("Error fetching stats:", error));

    // Fetch recent activities
    fetch("https://holy-lab-hospital.onrender.com/api/admin/recent-activities")
      .then((res) => res.json())
      .then((data) => setRecentActivities(data))
      .catch((error) => console.error("Error fetching activities:", error)); 
  }, []);

  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <FaUsers className="text-blue-500 text-4xl mr-4" />
          <div>
            <h2 className="text-xl font-semibold">{stats.students}</h2>
            <p className="text-gray-600">Employee</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <FaChalkboardTeacher className="text-green-500 text-4xl mr-4" />
          <div>
            <h2 className="text-xl font-semibold">{stats.teachers}</h2>
            <p className="text-gray-600">Attendance Person</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <FaMoneyBill className="text-yellow-500 text-4xl mr-4" />
          <div>
            <h2 className="text-xl font-semibold">${stats.revenue}</h2>
            <p className="text-gray-600">Revenue</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <FaClipboardList className="text-red-500 text-4xl mr-4" />
          <div>
            <h2 className="text-xl font-semibold">{stats.attendance}%</h2>
            <p className="text-gray-600">Attendance</p>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <ul className="space-y-3">
          {recentActivities.map((activity, index) => (
            <li key={index} className="text-gray-700">✔️ {activity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardHome;
