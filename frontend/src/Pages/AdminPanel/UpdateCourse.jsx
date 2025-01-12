import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdateCourse = () => {
  const [course, setCourse] = useState({
    name: "",
    level: "",
    description: "",
    image: "",
    lectures: "",
  });

  const [loading, setLoading] = useState(false); // Loading state for disabling buttons during request
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({
      ...course,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    setLoading(true); // Disable buttons during request
    try {
      const res = await axios.put(
        `http://localhost:8083/api/v1/admin/course-update/${id}`,
        course
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/course"); // Navigate to dashboard after successful creation
      } else {
        toast.error(res.data.message);
      }
      config;
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false); // Re-enable buttons
    }
  };

 

  return (
    <div className="container mt-5">
      <h2>Update Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Course Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={course.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Level</label>
          <input
            type="text"
            className="form-control"
            name="level"
            value={course.level}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={course.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="file"
            className="form-control"
            name="image"
            value={course.image}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? "Adding Course..." : "Add Course"}
          </button>
          {course.id && (
            <>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Course"}
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete Course"}
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateCourse;
