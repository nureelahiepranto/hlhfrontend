import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaChalkboardTeacher, FaUsers, FaCalendarAlt, FaBell } from "react-icons/fa";

const TeacherDashboardHome = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  
  // Fetch Upcoming Events from Backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://holy-lab-hospital.onrender.com/api/admin/events");
        const sortedEvents = response.data.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);
        setUpcomingEvents(sortedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const [stats, setStats] = useState({
      students: 0,
    });
  useEffect(() => {
      // Fetch dashboard stats
      fetch("https://holy-lab-hospital.onrender.com/api/admin/stats")
        .then((res) => res.json())
        .then((data) => setStats(data))
        .catch((error) => console.error("Error fetching stats:", error));
    }, []);

  // Function to format time to 12-hour format with AM/PM
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    let hour = parseInt(hours, 10);
    let ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // Convert 24-hour format to 12-hour format
    return `${hour}:${minutes} ${ampm}`;
  };

  // Quick Stats Data
  const quickStats = [
    { title: "Total Employee", value: stats.students, icon: <FaUsers className="w-8 h-8" />, bgColor: "bg-blue-500" },
    { title: "Staff Assigned", value: 5, icon: <FaChalkboardTeacher className="w-8 h-8" />, bgColor: "bg-green-500" },
    { title: "Upcoming Events", value: upcomingEvents.length, icon: <FaCalendarAlt className="w-8 h-8" />, bgColor: "bg-yellow-500" },
    { title: "Notifications", value: 2, icon: <FaBell className="w-8 h-8" />, bgColor: "bg-red-500" },
  ];

  // Recent Activities Data (Dummy for now)
  const recentActivities = [
    { description: "Marked attendance for Staff", time: "2 hours ago" },
    { description: "Uploaded assignment for Staff", time: "5 hours ago" },
    { description: "Reviewed Staff submissions", time: "1 day ago" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-red-400">Welcome , </h1>
        <p className="text-gray-600">Here's what's happening in your dashboard today.</p>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} p-6 rounded-lg shadow-md text-white flex items-center justify-between`}
          >
            <div>
              <p className="text-lg font-semibold">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <div className="text-white">{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Upcoming Events Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
        {upcomingEvents.length > 0 ? (
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <p className="text-lg font-semibold text-gray-800">{event.title}</p>
                <p className="text-sm text-gray-600">
                <span className="text-red-400">{new Date(event.date).toLocaleDateString()}</span> <span className="text-gray-400"> | </span> <span className="text-gray-600">{event.time}</span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No upcoming events.</p>
        )}
      </div>

      {/* Recent Activities Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0">
              <p className="text-lg font-semibold text-gray-800">{activity.description}</p>
              <p className="text-sm text-gray-600">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboardHome;
