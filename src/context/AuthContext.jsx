import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"; // Ensure correct import
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage when app loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwt_decode(token); // Decode token
        setUser({ ...decodedUser, token, _id: decodedUser.id }); // ✅ Ensure `_id` is set
      } catch (error) {
        console.error("Invalid token:", error);
        logout(); // If token is invalid, clear session
      }
    } 
  }, []);

  // Login function
  // const login = (token) => {
  //   localStorage.setItem("token", token); // Save token in localStorage
  //   const decodedUser = jwt_decode(token);
  //   setUser({ ...decodedUser, token });
  // };
  const login = (token) => {
    localStorage.setItem("token", token);
    const decodedUser = jwt_decode(token);
    setUser({ ...decodedUser, token, _id: decodedUser.id }); // Ensure _id is set
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("https://holy-lab-hospital.onrender.com/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched user:", res.data.user); // 🛑 Debugging line

        setUser(res.data.user); // Example: { _id: "67ab742b4c1644ceaa4a32eb", name: "John Doe", role: "student" }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);



  return (
    <AuthContext.Provider value={{ user, setUser , login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);





// import React, { createContext, useContext, useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";


// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);  // Using jwt_decode
//         setUser({ ...decodedToken, token });
//       } catch (error) {
//         console.error("Invalid token", error);
//         localStorage.removeItem("token");
//       }
//     }
//   }, []);

//   // const login = (token) => {
//   //   const decodedToken = jwt_decode(token);
//   //   setUser({ ...decodedToken, token });
//   //   localStorage.setItem("token", token);
//   // };

//   // const logout = () => {
//   //   setUser(null);
//   //   localStorage.removeItem("token");
//   // };

//   const login = (token) => {
//     localStorage.setItem("token", token);
//     const decoded = jwtDecode(token)
//     setUser({ id: decoded.id, role: decoded.role });
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };






// import React, { createContext, useContext, useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);  // Using jwt_decode
//         setUser({ ...decodedToken, token });
//       } catch (error) {
//         console.error("Invalid token", error);
//         localStorage.removeItem("token");
//       }
//     }
//   }, []);

//   const login = (token) => {
//     const decodedToken = jwt_decode(token);
//     setUser({ ...decodedToken, token });
//     localStorage.setItem("token", token);
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("token");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };
