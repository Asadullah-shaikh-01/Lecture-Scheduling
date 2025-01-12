import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const GetAllInstructor = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching instructors from API
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get("http://localhost:8083/api/v1/admin/instructors-all");
        setInstructors(response.data); // Assuming the API returns an array of instructors
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Failed to fetch instructor data.");
      }
    };

    fetchInstructors();
  }, []);

  return (
    <div className="container mt-5">
      <h2>All Instructors</h2>

      {/* Loading State */}
      {loading && <p>Loading instructors...</p>}

      {/* Displaying Instructor Data */}
      {!loading && instructors.length === 0 && (
        <p>No instructors found.</p>
      )}

      {/* Table to display instructors */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {instructors.map((instructor, index) => (
              <tr key={instructor.id}>
                <td>{index + 1}</td>
                <td>{instructor.UserName}</td>
                <td>{instructor.Email}</td>
                <td>
                  {/* Action Buttons */}
                  <button className="btn btn-primary btn-sm me-2">View</button>
                  <button className="btn btn-warning btn-sm me-2">Edit</button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetAllInstructor;
