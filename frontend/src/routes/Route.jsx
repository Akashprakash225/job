import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import About from "../pages/About";
import Job from "../pages/Job";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProfilePage from "../pages/ProfilePage";
import JobDetails from "../pages/JobDetails";
import Companies from "../pages/Companies";
import UserLayout from "../layout/UserLayout";
import AuthUser from "./protectedRoutes/AuthUser";
import { Profile } from "../pages/user/Profile";
import { ErrorPage } from "../components/errorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "job",
        element: <Job />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "job-details/:id",
        element: <JobDetails />,
      },
      {
        path: "companies",
        element: <Companies />,
      },
      {
        path: "user",
        element: <AuthUser />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);
