import {
  FaHome,
  FaPlus,
  FaUser,
} from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import './AdminPanel.css';  // For additional styling (optional)

const AdminPanel = () => {
  const navigate = useNavigate();

  const LogOutHandel = () => {
    // Clear user data from localStorage or any other storage
    localStorage.removeItem("user"); // Example: Remove user data
    localStorage.removeItem("token"); // Example: Remove token

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar Section */}
        <div className="col-md-3 col-lg-2 bg-success text-white p-4 sidebar">
          <h4 className="text-center mb-4">Admin Panel</h4>
          <ul className="list-unstyled">
            {/* Dashboard Link */}
            <li>
              <Link
                to="/dashboard"
                className="text-white d-flex align-items-center py-2 sidebar-link"
              >
                <FaHome className="me-2" /> Dashboard
              </Link>
            </li>

            {/* Course Management Section */}
            <li>
              <div className="d-flex flex-column">
                <div
                  className="text-white d-flex align-items-center py-2 sidebar-link"
                  data-bs-toggle="collapse"
                  data-bs-target="#addCourseSubmenu"
                  role="button"
                  aria-expanded="false"
                  aria-controls="addCourseSubmenu"
                >
                  <FaPlus className="me-2" /> Course
                </div>
                <div id="addCourseSubmenu" className="collapse">
                  <ul className="list-unstyled ms-4">
                    <li>
                      <Link to="/add-course" className="text-white d-flex py-1">
                        Add Course
                      </Link>
                    </li>
                    <li>
                      <Link to="/all-course" className="text-white d-flex py-1">
                        All Course
                      </Link>
                    </li>
                    <li>
                      <Link to="/update-course" className="text-white d-flex py-1">
                        Update Course
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            {/* Manage Lectures Section */}
            <li>
              <div className="d-flex flex-column">
                <div
                  className="text-white d-flex align-items-center py-2 sidebar-link"
                  data-bs-toggle="collapse"
                  data-bs-target="#ManageLecturesSubmenu"
                  role="button"
                  aria-expanded="false"
                  aria-controls="ManageLecturesSubmenu"
                >
                  <FaPlus className="me-2" /> Manage Lectures
                </div>
                <div id="ManageLecturesSubmenu" className="collapse">
                  <ul className="list-unstyled ms-4">
                    <li>
                      <Link
                        to="/add-lectures"
                        className="text-white d-flex py-1"
                      >
                        Add Lectures
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/all-lectures"
                        className="text-white d-flex py-1"
                      >
                        All Lectures
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/update-lecture"
                        className="text-white d-flex py-1"
                      >
                        Update Lectures
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            {/* Manage Instructor Section */}
            <li>
              <div className="d-flex flex-column">
                <div
                  className="text-white d-flex align-items-center py-2 sidebar-link"
                  data-bs-toggle="collapse"
                  data-bs-target="#ManageInstructorSubmenu"
                  role="button"
                  aria-expanded="false"
                  aria-controls="ManageInstructorSubmenu"
                >
                  <FaPlus className="me-2" /> Manage Instructor
                </div>
                <div id="ManageInstructorSubmenu" className="collapse">
                  <ul className="list-unstyled ms-4">
                    <li>
                      <Link
                        to="/add-instructor"
                        className="text-white d-flex py-1"
                      >
                        Add Instructor
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/all-instructors"
                        className="text-white d-flex py-1"
                      >
                        All Instructors
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            {/* Logout Section */}
            <li>
              <div
                onClick={LogOutHandel}
                className="text-white d-flex align-items-center py-2 sidebar-link"
              >
                <FaUser className="me-2" /> Logout
              </div>
            </li>
          </ul>
        </div>

        {/* Main Content Section */}
        <div className="col-md-9 col-lg-10 p-4">
          <h2>Welcome to the Admin Panel</h2>
          <Outlet /> {/* This will render the nested route content */}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
