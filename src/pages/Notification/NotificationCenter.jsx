import React, { useEffect, useState } from "react";
import axiosPublic from "../../api/axiosPublic";
import Swal from "sweetalert2";

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = () => {
    axiosPublic.get("/notifications").then((res) => {
      setNotifications(res.data);
    });
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const notification = {
      title: form.title.value,
      message: form.message.value,
      createdAt: new Date(),
    };

    const res = await axiosPublic.post(
      "/notifications",
      notification
    );

    if (res.data.insertedId) {
      Swal.fire({
        icon: "success",
        title: "Notification Added",
        timer: 1500,
        showConfirmButton: false,
      });

      form.reset();

      loadNotifications();
    }
  };

  const handleDelete = async (id) => {
    const res = await axiosPublic.delete(
      `/notifications/${id}`
    );

    if (res.data.deletedCount > 0) {
      Swal.fire({
        icon: "success",
        title: "Deleted Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      loadNotifications();
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-4xl font-bold mb-6">
        Notification Center
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 mb-8"
      >

        <input
          name="title"
          className="input input-bordered w-full"
          placeholder="Notification Title"
          required
        />

        <textarea
          name="message"
          className="textarea textarea-bordered w-full"
          placeholder="Notification Message"
          required
        ></textarea>

        <button className="btn btn-success">
          Send Notification
        </button>

      </form>

      <div className="overflow-x-auto">

        <table className="table">

          <thead>

            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Message</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {notifications.map((item, index) => (
              <tr key={item._id}>

                <td>{index + 1}</td>

                <td>{item.title}</td>

                <td>{item.message}</td>

                <td>

                  <button
                    onClick={() =>
                      handleDelete(item._id)
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

export default NotificationCenter;