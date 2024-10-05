import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/AxiosInstances";

export const EmployerSignup = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/employer/signup",
        data,
      });
      console.log(response, "======response");
      toast.success("Signup Success");
      navigate("employer/login");
    } catch (error) {
      toast.error("Signup Failed");
      console.log(error);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Signup Now!</h1>
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
                <span className="label-text">Company Name</span>
              </label>
              <input
                type="text"
                {...register("companyName")}
                placeholder="Company Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="Email"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password")}
                placeholder="Password"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="tel"
                {...register("phone")}
                placeholder="Number"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>{" "}
              </label>
              <input
                type="text"
                {...register("location")}
                placeholder="Location"
                className="input input-bordered"
                required
              />
            </div>

            <label className="label">
              <Link to={"/login"}>Existing User?</Link>
            </label>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Signup</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
