import React, { useEffect, useState } from "react";
import axiosPublic from "../../api/axiosPublic";
import Swal from "sweetalert2";

const CollectorPerformance = () => {
  const [collectors, setCollectors] = useState([]);

  const loadCollectors = () => {
    axiosPublic.get("/collectors").then((res) => {
      setCollectors(res.data);
    });
  };

  useEffect(() => {
    loadCollectors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const collector = {
      name: form.name.value,
      totalPickups: Number(form.pickups.value),
      successfulPickups: Number(form.success.value),
      rating: Number(form.rating.value),
    };

    const res = await axiosPublic.post("/collectors", collector);

    if (res.data.insertedId) {
      Swal.fire({
        icon: "success",
        title: "Collector Added",
        timer: 1500,
        showConfirmButton: false,
      });

      form.reset();

      loadCollectors();
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-4xl font-bold mb-6">
        Collector Performance
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 mb-8"
      >

        <input
          name="name"
          className="input input-bordered"
          placeholder="Collector Name"
          required
        />

        <input
          name="pickups"
          type="number"
          className="input input-bordered"
          placeholder="Total Pickups"
          required
        />

        <input
          name="success"
          type="number"
          className="input input-bordered"
          placeholder="Successful Pickups"
          required
        />

        <input
          name="rating"
          type="number"
          step="0.1"
          className="input input-bordered"
          placeholder="Rating"
          required
        />

        <button className="btn btn-success col-span-2">
          Add Collector
        </button>

      </form>

      <div className="overflow-x-auto">

        <table className="table">

          <thead>

            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Total Pickups</th>
              <th>Successful</th>
              <th>Rating</th>
            </tr>

          </thead>

          <tbody>

            {collectors.map((collector, index) => (
              <tr key={collector._id}>
                <td>{index + 1}</td>
                <td>{collector.name}</td>
                <td>{collector.totalPickups}</td>
                <td>{collector.successfulPickups}</td>
                <td>{collector.rating}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default CollectorPerformance;