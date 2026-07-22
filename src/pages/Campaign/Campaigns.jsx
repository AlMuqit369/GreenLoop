import React, { useEffect, useState } from "react";
import axiosPublic from "../../api/axiosPublic";
import Swal from "sweetalert2";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  const loadCampaigns = () => {
    axiosPublic.get("/campaigns").then((res) => {
      setCampaigns(res.data);
    });
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const campaign = {
      title: form.title.value,
      location: form.location.value,
      date: form.date.value,
      description: form.description.value,
      createdAt: new Date(),
    };

    const res = await axiosPublic.post("/campaigns", campaign);

    if (res.data.insertedId) {
      Swal.fire({
        icon: "success",
        title: "Campaign Added",
        timer: 1500,
        showConfirmButton: false,
      });

      form.reset();

      loadCampaigns();
    }
  };

  const handleDelete = async (id) => {
    const res = await axiosPublic.delete(`/campaigns/${id}`);

    if (res.data.deletedCount > 0) {
      Swal.fire({
        icon: "success",
        title: "Campaign Deleted",
        timer: 1500,
        showConfirmButton: false,
      });

      loadCampaigns();
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-4xl font-bold mb-6">
        Community Campaigns
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 mb-8"
      >

        <input
          name="title"
          className="input input-bordered"
          placeholder="Campaign Title"
          required
        />

        <input
          name="location"
          className="input input-bordered"
          placeholder="Location"
          required
        />

        <input
          type="date"
          name="date"
          className="input input-bordered"
          required
        />

        <input
          name="description"
          className="input input-bordered"
          placeholder="Description"
          required
        />

        <button className="btn btn-success col-span-2">
          Add Campaign
        </button>

      </form>

      <div className="overflow-x-auto">

        <table className="table">

          <thead>

            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Location</th>
              <th>Date</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {campaigns.map((campaign, index) => (
              <tr key={campaign._id}>

                <td>{index + 1}</td>

                <td>{campaign.title}</td>

                <td>{campaign.location}</td>

                <td>{campaign.date}</td>

                <td>

                  <button
                    onClick={() =>
                      handleDelete(campaign._id)
                    }
                    className="btn btn-error btn-xs"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Campaigns;