import { createBrowserRouter } from "react-router-dom";
import About from "../pages/About";
import Job from "../pages/Job";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import JobDetails from "../pages/JobDetails";
import Companies from "../pages/Companies";
import UserLayout from "../layout/UserLayout";
import AuthUser from "./protectedRoutes/AuthUser";
import { Profile } from "../pages/user/Profile";
import { ErrorPage } from "../components/ErrorPage";
import { SavedJobs } from "../components/user/SavedJobs";
import { EmployerLayout } from "../layout/EmployerLayout";
import { EmployerProfilePage } from "../pages/employer/EmployerProfilePage";
import { EmployersJob } from "../pages/employer/EmployersJob";
import { EmployersNewJob } from "../pages/employer/EmployersNewJob";
import AuthEmployer from "./protectedRoutes/AuthEmployer";
import { EmployerSignup } from "../pages/employer/EmployerSignup";
import { UserProfileEdit } from "../pages/user/UserProfileEdit";
import Home from "../pages/Home";
import { EmployerProfileEdit } from "../pages/employer/EmployerProfileEdit";
import Search from "../components/Search";

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
        path: "search",
        element: <Search />,
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
          {
            path: "saved",
            element: <SavedJobs />,
          },
          {
            path: "edit",
            element: <UserProfileEdit />,
          },
        ],
      },
    ],
  },
  {
    path: "employer",
    element: <EmployerLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "signup",
        element: <EmployerSignup />,
      },
      {
        path: "login",
        element: <Login role="employer" />,
      },
      {
        path: "/employer",
        element: <AuthEmployer />,
        children: [
          {
            path: "profile",
            element: <EmployerProfilePage />,
          },
          {
            path: "job",
            element: <EmployersJob />,
          },
          {
            path: "new-job",
            element: <EmployersNewJob />,
          },
          {
            path: "edit",
            element: <EmployerProfileEdit />,
          },
        ],
      },
    ],
  },
]);
