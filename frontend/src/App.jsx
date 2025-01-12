import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import AdminPanel from "./Pages/AdminPanel/AdminPanel";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCourse from "./Pages/AdminPanel/AddCourse";
import instructor from "./Pages/Instructor/instructor";
import AllCourse from "./Pages/AdminPanel/AllCourse";
import UpdateCourse from "./Pages/AdminPanel/UpdateCourse";
import getAllinstructor from "./Pages/Instructor/getAllinstructor";
import leacture from "./Pages/Lecture/leacture";
import getAllLecture from "./Pages/Lecture/getAllLecture";
import UpdateLecture from "./Pages/Lecture/UpdateLecture";

const App = () => {
  const MyRouter = createBrowserRouter([
    { path: "", Component: LoginPage },
    { path: "login", Component: LoginPage },
    { path: "register", Component: RegisterPage },
    {
      path: "dashboard",
      Component: AdminPanel, // Parent route needs to render an Outlet here
      children: [
        {
          path: "course",Component: AddCourse,
          children: [
            { path: "add-course", Component: AddCourse },
            { path: "all-course", Component: AllCourse },
            { path: "update-course", Component: UpdateCourse },
          ],
        },
        {
          path: "instructor",
          Component: instructor,
          children: [{ path: "all-instructor", Component: getAllinstructor }],
        },
        {
          path: "lecture",
          Component: leacture,
          children: [
            { path: "add-lecture", Component: leacture },
            { path: "all-lecture", Component: getAllLecture },
            { path: "update-lecture", Component: UpdateLecture },
          ],
        },
      ],
    },
  ]);

  return (
    <div>
      <ToastContainer />
      <RouterProvider router={MyRouter} />
    </div>
  );
};

export default App;
