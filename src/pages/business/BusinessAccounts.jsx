import React, { useEffect, useState } from "react";
import axiosPublic from "../../api/axiosPublic";
import Swal from "sweetalert2";

const BusinessAccounts = () => {
  const [businesses, setBusinesses] = useState([]);

  const loadBusinesses = () => {
    axiosPublic
      .get("/businesses")
      .then((res) => {
        setBusinesses(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadBusinesses();
  }, []);

  const handleApprove = async (id) => {
    try {
      const res = await axiosPublic.patch(`/businesses/${id}`, {
        status: "Approved",
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Business Approved!",
          timer: 1500,
          showConfirmButton: false,
        });

        loadBusinesses();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await axiosPublic.patch(`/businesses/${id}`, {
        status: "Rejected",
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Business Rejected!",
          timer: 1500,
          showConfirmButton: false,
        });

        loadBusinesses();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-4xl font-bold mb-8">
        Business Accounts
      </h1>

      <div className="overflow-x-auto">

        <table className="table table-zebra">

          <thead>

            <tr>
              <th>#</th>
              <th>Business</th>
              <th>Owner</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {businesses.map((business, index) => (
              <tr key={business._id}>

                <td>{index + 1}</td>

                <td>{business.businessName}</td>

                <td>{business.ownerName}</td>

                <td>{business.email}</td>

                <td>

                  {business.status === "Pending" && (
                    <span className="badge badge-warning">
                      Pending
                    </span>
                  )}

                  {business.status === "Approved" && (
                    <span className="badge badge-success">
                      Approved
                    </span>
                  )}

                  {business.status === "Rejected" && (
                    <span className="badge badge-error">
                      Rejected
                    </span>
                  )}

                </td>

                <td>

                  {business.status === "Pending" ? (
                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          handleApprove(business._id)
                        }
                        className="btn btn-success btn-xs"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          handleReject(business._id)
                        }
                        className="btn btn-error btn-xs"
                      >
                        Reject
                      </button>

                    </div>
                  ) : (
                    <span className="text-gray-500">
                      No Action
                    </span>
                  )}

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default BusinessAccounts;