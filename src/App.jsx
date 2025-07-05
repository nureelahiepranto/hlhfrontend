import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";

import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";


import LoginPage from "./pages/LoginPage.jsx";
import Unauthorized from "./pages/Unauthorized";

import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>

          <Route path="/" element={<LoginPage />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route
            path="/admin-dashboard/*"
            element={
              <PrivateRoute roles={["admin"]}>

                  <AdminDashboard />

              </PrivateRoute>
            }
          />

          <Route
            path="/teacher/dashboard/*"
            element={
              <PrivateRoute roles={["teacher"]}>
               
                  <TeacherDashboard />
               
              </PrivateRoute>
            }
          />

          



          
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;