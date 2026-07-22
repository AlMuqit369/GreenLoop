import React from "react";
import { useForm } from "react-hook-form";
import axiosPublic from "../../api/axiosPublic";

const AddBusiness = () => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {

    const businessData = {
      businessName: data.businessName,
      ownerName: data.ownerName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      tradeLicense: data.tradeLicense,
      status: "Pending",
      createdAt: new Date(),
    };

    try {

      const res = await axiosPublic.post("/businesses", businessData);

      console.log(res.data);

      alert("Business Added Successfully");

      reset();

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div className="max-w-4xl mx-auto">

      <h2 className="text-4xl font-bold mb-8">
        Register Business
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >

        <input
          {...register("businessName")}
          className="input input-bordered w-full"
          placeholder="Business Name"
        />

        <input
          {...register("ownerName")}
          className="input input-bordered w-full"
          placeholder="Owner Name"
        />

        <input
          {...register("email")}
          className="input input-bordered w-full"
          placeholder="Email"
        />

        <input
          {...register("phone")}
          className="input input-bordered w-full"
          placeholder="Phone"
        />

        <input
          {...register("address")}
          className="input input-bordered w-full"
          placeholder="Business Address"
        />

        <input
          {...register("tradeLicense")}
          className="input input-bordered w-full"
          placeholder="Trade License"
        />

        <button className="btn btn-success">

          Register Business

        </button>

      </form>

    </div>
  );
};

export default AddBusiness;