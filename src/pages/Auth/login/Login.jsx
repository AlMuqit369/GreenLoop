import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import axiosPublic from "../../../api/axiosPublic";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleLogin = async (data) => {
    try {
      // Firebase Login
      const result = await signInUser(data.email, data.password);

      // Get User From MongoDB
      const res = await axiosPublic.get("/users");

      const currentUser = res.data.find(
        (user) => user.email === result.user.email
      );

      console.log("Current User:", currentUser);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome ${currentUser?.name || ""}`,
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(from, { replace: true });

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-md mx-auto shadow-2xl">

      <h2 className="text-3xl font-bold text-center mt-6">
        Login
      </h2>

      <form
        className="card-body"
        onSubmit={handleSubmit(handleLogin)}
      >
        <fieldset className="fieldset">

          {/* Email */}

          <label className="label">
            Email
          </label>

          <input
            type="email"
            className="input input-bordered"
            placeholder="Enter Email"
            {...register("email", {
              required: "Email is required",
            })}
          />

          {errors.email && (
            <p className="text-red-500">
              {errors.email.message}
            </p>
          )}

          {/* Password */}

          <label className="label">
            Password
          </label>

          <input
            type="password"
            className="input input-bordered"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />

          {errors.password && (
            <p className="text-red-500">
              {errors.password.message}
            </p>
          )}

          <button className="btn btn-success mt-5">
            Login
          </button>

          <p className="mt-4 text-center">
            New to GreenLoop?{" "}
            <Link
              className="text-blue-600 font-semibold"
              to="/register"
            >
              Register
            </Link>
          </p>

        </fieldset>
      </form>

      <SocialLogin />
    </div>
  );
};

export default Login;