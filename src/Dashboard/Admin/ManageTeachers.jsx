import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaSpinner } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ManageTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    image: "",
  });
  const [editTeacher, setEditTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch teachers on load
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem("token");
        console.log("Token from localStorage:", token);

        // Check if the token exists
        if (!token) {
          throw new Error("No token found, please log in again.");
        }

        // Make the API request with the token in the headers
        const response = await axios.get("https://holy-lab-hospital.onrender.com/api/teachers/list", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched Teachers: ", response.data.teachers);
        setTeachers(response.data.teachers || []);
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image upload using Cloudinary
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };
  

  // Add or Update Teacher
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found, please log in again.");
        return;
      }
  
      const formDataData = new FormData();
      formDataData.append("name", formData.name);
      formDataData.append("email", formData.email);
      formDataData.append("password", formData.password);
      formDataData.append("phone", formData.phone);
      formDataData.append("address", formData.address);
      if (formData.image) {
        formDataData.append("image", formData.image);
      }
  
      const response = editTeacher
  ? await axios.put(
      `https://holy-lab-hospital.onrender.com/api/teachers/update/${editTeacher._id}`,
      formDataData,
      { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
    )
  : await axios.post(
      "https://holy-lab-hospital.onrender.com/api/teachers/add",
      formDataData,
      { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
    );
  
      if (editTeacher) {
        setTeachers((prev) =>
          prev.map((teacher) => (teacher._id === editTeacher._id ? response.data.teacher : teacher))
        );
        toast.success("Attendance Person updated successfully");
      } else {
        setTeachers([...teachers, response.data.teacher]);
        toast.success("Attendance Person added successfully");
      }
  
      setFormData({ name: "", email: "", password: "", phone: "", address: "", image: "" });
      setEditTeacher(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error managing teacher");
    }
  };
  
  

  // Delete Teacher
  const handleDelete = async (id) => {
    console.log("Deleting teacher with ID:", id); // Debugging
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found, please log in again.");
  
        const response = await axios.delete(
          `https://holy-lab-hospital.onrender.com/api/teachers/delete/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        console.log("Delete Response:", response.data);
  
        setTeachers((prev) => prev.filter((teacher) => teacher._id !== id));
        toast.success("Attendance Person deleted successfully");
      } catch (err) {
        console.error("Delete Error:", err);
        toast.error(err.response?.data?.message || "Error deleting teacher");
      }
    }
  };

  // Edit Teacher
  const handleEdit = (teacher) => {
    setEditTeacher(teacher);
    setFormData({
      name: teacher.name,
      email: teacher.email,
      password: "",
      phone: teacher.teacherDetails?.phone,
      address: teacher.teacherDetails?.address,
      image: teacher.teacherDetails?.image,
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Attendance People</h2>

      {/* Add/Edit Teacher Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-700">
          {editTeacher ? "Edit" : "Add"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {!editTeacher && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          )}
          <input
            type="file"
            name="image"
            onChange={handleImageUpload}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="Teacher"
              className="w-20 h-20 rounded-full object-cover"
            />
          )}
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          {editTeacher ? "Update" : "Add"}
        </button>
      </form>

      {/* Teacher List Table */}
      <h3 className="text-xl font-bold mb-4 text-gray-800">Attendance People List</h3>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
        </div>
      ) : teachers.length > 0 ? (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Image</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Address</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher._id} className="border-t hover:bg-gray-50 transition duration-200">
                  <td className="px-6 py-4">
                    <img
                      src={teacher.image || teacher.teacherDetails?.image || "https://via.placeholder.com/50"}
                      alt={teacher.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{teacher.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{teacher.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{teacher.teacherDetails?.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{teacher.teacherDetails?.address}</td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleEdit(teacher)}
                      className="text-yellow-500 hover:text-yellow-600 mr-4"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(teacher._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center">No teachers found.</p>
      )}
    </div>
  );
}

export default ManageTeachers;
