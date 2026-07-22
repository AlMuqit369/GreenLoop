import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import axiosPublic from "../../../api/axiosPublic";
import Swal from "sweetalert2";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleRegistration = async (data) => {
    try {
      // Firebase Registration
      const result = await registerUser(data.email, data.password);

      const loggedUser = result.user;

      // User for MongoDB
      const userInfo = {
        name: data.name,
        email: loggedUser.email,
        role: data.role,
        status: "Active",
        createdAt: new Date(),
      };

      const res = await axiosPublic.post("/users", userInfo);

      if (res.data.insertedId || res.data.message === "User already exists") {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Welcome to GreenLoop!",
          timer: 1800,
          showConfirmButton: false,
        });

        reset();

        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-md mx-auto shadow-2xl">
      <h2 className="text-3xl font-bold text-center mt-6">
        Create Your Account
      </h2>

      <form
        className="card-body"
        onSubmit={handleSubmit(handleRegistration)}
      >
        <fieldset className="fieldset">

          {/* Name */}

          <label className="label">Full Name</label>

          <input
            type="text"
            className="input input-bordered"
            placeholder="Enter Your Name"
            {...register("name", {
              required: "Name is required",
            })}
          />

          {errors.name && (
            <p className="text-red-500">{errors.name.message}</p>
          )}

          {/* Email */}

          <label className="label">Email</label>

          <input
            type="email"
            className="input input-bordered"
            placeholder="Enter Email"
            {...register("email", {
              required: "Email is required",
            })}
          />

          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          {/* Role */}

          <label className="label">Select Role</label>

          <select
            className="select select-bordered"
            defaultValue=""
            {...register("role", {
              required: "Role is required",
            })}
          >
            <option value="" disabled>
              Select Role
            </option>

            <option value="Household">
              Household
            </option>

            <option value="Collector">
              Collector
            </option>

            <option value="Business">
              Business
            </option>

            <option value="Company">
              Recycling Company
            </option>
          </select>

          {errors.role && (
            <p className="text-red-500">{errors.role.message}</p>
          )}

          {/* Password */}

          <label className="label">Password</label>

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
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <button className="btn btn-success mt-5">
            Register
          </button>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link
              className="text-blue-600 font-semibold"
              to="/login"
            >
              Login
            </Link>
          </p>

        </fieldset>
      </form>

      <SocialLogin />
    </div>
  );
};

export default Register;