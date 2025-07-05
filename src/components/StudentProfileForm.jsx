import React, { useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function StudentProfileForm() {
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    parentEmail: "",
    profileImage: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStudentData({ ...studentData, profileImage: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(studentData).forEach((key) => {
      if (key === "profileImage" && studentData[key]) {
        formData.append(key, studentData[key]);
      } else {
        formData.append(key, studentData[key]);
      }
    });

    try {
      await axios.post("https://holy-lab-hospital.onrender.com/api/students", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Student profile created successfully");
      setStudentData({
        name: "",
        email: "",
        password: "",
        address: "",
        phone: "",
        parentEmail: "",
        profileImage: null,
      });
      setPreviewImage(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          Create Employee Profile
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Employee Name"
                value={studentData.name}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Student Email"
                value={studentData.email}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={studentData.password}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
        
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={studentData.address}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="+880"
                value={studentData.phone}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Confirm Email</label>
              <input
                type="email"
                name="parentEmail"
                placeholder="Confirm Email"
                value={studentData.parentEmail}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Profile Image Upload */}
            <div>
              <label className="block font-medium text-gray-700">Student Image</label>
              <input
                type="file"
                name="profileImage"
                onChange={handleFileChange}
                required
                className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="mt-4 w-full sm:w-32 h-auto sm:h-32 object-cover rounded-lg shadow"
                />
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
            >
              <FaPlus className="text-white" /> Submit
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </>
  );
}

export default StudentProfileForm;
