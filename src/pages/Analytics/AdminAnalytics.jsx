import React, { useEffect, useState } from "react";
import axiosPublic from "../../api/axiosPublic";

const AdminAnalytics = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBusinesses: 0,
    pendingBusinesses: 0,
    totalCampaigns: 0,
    totalNotifications: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic
      .get("/admin-stats")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  return (
    <div className="p-6">

      <h1 className="text-4xl font-bold mb-8">
        Admin Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

        {/* Users */}
        <div className="card bg-primary text-primary-content shadow-xl">
          <div className="card-body text-center">
            <h2 className="text-xl font-semibold">
              Total Users
            </h2>

            <p className="text-5xl font-bold">
              {stats.totalUsers}
            </p>
          </div>
        </div>

        {/* Businesses */}
        <div className="card bg-success text-success-content shadow-xl">
          <div className="card-body text-center">
            <h2 className="text-xl font-semibold">
              Businesses
            </h2>

            <p className="text-5xl font-bold">
              {stats.totalBusinesses}
            </p>
          </div>
        </div>

        {/* Pending */}
        <div className="card bg-warning text-warning-content shadow-xl">
          <div className="card-body text-center">
            <h2 className="text-xl font-semibold">
              Pending
            </h2>

            <p className="text-5xl font-bold">
              {stats.pendingBusinesses}
            </p>
          </div>
        </div>

        {/* Campaigns */}
        <div className="card bg-info text-info-content shadow-xl">
          <div className="card-body text-center">
            <h2 className="text-xl font-semibold">
              Campaigns
            </h2>

            <p className="text-5xl font-bold">
              {stats.totalCampaigns}
            </p>
          </div>
        </div>

        {/* Notifications */}
        <div className="card bg-secondary text-secondary-content shadow-xl">
          <div className="card-body text-center">
            <h2 className="text-xl font-semibold">
              Notifications
            </h2>

            <p className="text-5xl font-bold">
              {stats.totalNotifications}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminAnalytics;