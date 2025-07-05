import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AdminDashboard from '../pages/AdminDashboard.jsx';


const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {user?.role === 'admin' && <AdminDashboard />}
      {/* {user?.role === 'teacher' && <TeacherDashboard />} */}
    </div>
  );
};

export default Dashboard;