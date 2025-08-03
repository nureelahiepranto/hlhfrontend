import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';


function SearchStudent() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('https://holy-lab-hospital.onrender.com/api/students');
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching students:', error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    const filtered = students.filter(
      (student) =>
        student?.userId?.name?.toLowerCase().includes(query) ||
        student?.className?.toLowerCase().includes(query) ||
        student?.rollNumber?.toString().includes(query) ||
        student?.parentEmail?.toLowerCase().includes(query) ||
        student?.userId?.email?.toLowerCase().includes(query)
    );

    setFilteredStudents(filtered);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
    <div className="p-6 mt-10 mb-10">
    <h1 className="text-3xl font-bold mb-8">Employee List</h1>

    {/* Search Input */}
    <input
      type="text"
      value={search}
      onChange={handleSearch}
      placeholder="Search by name or email..."
      className="mb-4 w-full border px-3 py-2 rounded"
    />

    <table className="w-full border-collapse border border-gray-300 mt-10 mb-10">
      <thead>
        <tr>
          <th className="border p-2">#</th>
          <th className="border p-2">Image</th>
          <th className="border p-2">Name</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Phone</th>
          <th className="border p-2">Designation</th>
        </tr>
      </thead>
      <tbody>
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student, index) => (
            <tr key={student._id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <img
                  src={student?.userId?.profileImage || 'https://via.placeholder.com/50'}
                  alt={student?.userId?.name || 'Unknown'}
                  className="w-12 h-12 rounded-full"
                  />
              </td>
              <td className="border p-2">{student?.userId?.name || 'N/A'}</td>
              <td className="border p-2">{student?.userId?.email || 'N/A'}</td>
              <td className="border p-2">{student?.phone || 'N/A'}</td>
              <td className="border p-2">{student?.address || 'N/A'}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="border p-2 text-center" colSpan="8">
              No students found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
        </>
  );
}

export default SearchStudent;
