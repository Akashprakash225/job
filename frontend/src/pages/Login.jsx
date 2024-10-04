import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../config/AxiosInstances";
import toast from "react-hot-toast";

const Login = ({ role = "user" }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const userRoutes = {
    user: {
      login_api: "/user/login",
      profile_route: "/user/profile",
      signup_route: "/signup",
    },
    employer: {
      login_api: "/employer/login",
      profile_route: "/employer/profile",
      signup_route: "/employer/signup",
    },
  };

  const currentUser = userRoutes[role] || userRoutes.user;

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(currentUser.login_api, data);
      // Assuming your API sends back a token
      document.cookie = `token=${response.data.token}; path=/; secure; SameSite=None;`;
      toast.success("Login Success");
      navigate(currentUser.profile_route);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login Failed";
      toast.error(errorMessage);
      console.error("Login error:", error);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">
            Login now{role === "employer" && " as Employer"}!
          </h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="email"
                className={`input input-bordered ${
                  errors.email ? "input-error" : ""
                }`}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                placeholder="password"
                className={`input input-bordered ${
                  errors.password ? "input-error" : ""
                }`}
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
              <label className="label">
                <Link to={currentUser.signup_route}>New User?</Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
