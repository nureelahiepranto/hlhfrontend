import { useEffect, useState } from 'react';
import axios from 'axios';

const ApprovedAttendance = () => {
    const [teachers, setTeachers] = useState([]);
    
    // Fetch Teachers
    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get('https://holy-lab-hospital.onrender.com/api/teachers/ApprovedTeacherGet'); // Fetch all teachers
                setTeachers(response.data);
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };
        fetchTeachers();
    }, []);

    // Approve or Disapprove Teacher
    const handleApprovalChange = async (teacherId, isApproved) => {
        try {
            await axios.put(`https://holy-lab-hospital.onrender.com/api/teachers/approve-teacher/${teacherId}`, { isApproved });
            setTeachers((prev) =>
                prev.map((teacher) =>
                    teacher._id === teacherId ? { ...teacher, isApproved } : teacher
                )
            );
        } catch (error) {
            console.error('Error updating approval status:', error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-rose-500">Approved Teacher Attendance</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Image</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Phone</th>
                        <th className="border p-2">Approval Status</th>
                        <th className="border p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map((teacher) => (
                        <tr key={teacher._id} className="border text-center">
                            <td className="border p-2">
                                <img src={teacher.image} alt={teacher.name} className="h-12 w-12 rounded-full" />
                            </td>
                            <td className="border p-2">{teacher.userId?.name}</td>
                            <td className="border p-2">{teacher.userId?.email}</td>
                            <td className="border p-2">{teacher.phone}</td>
                            <td className="border p-2">
                                <span className={`px-2 py-1 rounded text-white ${teacher.isApproved ? 'bg-green-500' : 'bg-red-500'}`}>
                                    {teacher.isApproved ? 'Approved' : 'Pending'}
                                </span>
                            </td>
                            <td className="border p-2">
                                <button
                                    className={`px-3 py-1 rounded text-white ${teacher.isApproved ? 'bg-red-500' : 'bg-green-500'}`}
                                    onClick={() => handleApprovalChange(teacher._id, !teacher.isApproved)}
                                >
                                    {teacher.isApproved ? 'Revoke' : 'Approve'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApprovedAttendance;
