import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AllCourse = () => {
  const [courses, setCourses] = useState([]); // State to store course data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:8083/api/v1/admin/courses-all");
        setCourses(res.data); // Assuming res.data contains an array of courses
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error(error.response?.data?.error || "Failed to fetch courses.");
        setError(error.response?.data?.error || "An error occurred.");
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (name) => {
    try {
      await axios.delete(`http://localhost:8083/api/v1/admin/course/${name}`);
      toast.success("Course deleted successfully.");
      setCourses(courses.filter((course) => course.name !== name)); // Remove deleted course from state
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("Failed to delete course.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">Error: {error}</div>;
  }

  return (
    <div className="container">
      <h4>Course Data</h4>
      <div className="row">
        {courses.map((course) => (
          <div className="col-md-4 mb-3" key={course.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{course.name}</h5>
                <p className="card-text">{course.description}</p>
                <p>
                  <strong>Instructor:</strong> {course.instructor}
                </p>
                <p>
                  <strong>Date:</strong> {course.date}
                </p>
                <Link to={`/course/${course.id}`} className="btn btn-primary">
                  View More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h4>Lecture Schedules</h4>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Lecture ID</th>
              <th>Course</th>
              <th>Instructor</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.name}</td>
                <td>{course.instructor}</td>
                <td>{course.date}</td>
                <td>
                  <Link to="/add-create">
                    <button className="btn btn-success btn-sm">Create</button>
                  </Link>
                  <Link to={`/edit-course/${id}`}>
                    <button className="btn btn-warning btn-sm ms-2">Edit</button>
                  </Link>
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => handleDelete(name)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {courses.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No courses available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCourse;
