import React, { useEffect, useState } from "react";
import axiosPublic from "../../api/axiosPublic";

const DashboardHome = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await axiosPublic.get("/dashboard-stats");
        console.log("Dashboard Stats:", res.data);
        setStats(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadStats();
  }, []);

  if (!stats) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8">
        GreenLoop Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="card bg-primary text-primary-content shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Total Users</h2>
            <p className="text-5xl font-bold">
              {stats.totalUsers}
            </p>
          </div>
        </div>

        <div className="card bg-success text-success-content shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Businesses</h2>
            <p className="text-5xl font-bold">
              {stats.totalBusinesses}
            </p>
          </div>
        </div>

        <div className="card bg-warning text-warning-content shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Pending</h2>
            <p className="text-5xl font-bold">
              {stats.pendingBusinesses}
            </p>
          </div>
        </div>

        <div className="card bg-info text-info-content shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Approved</h2>
            <p className="text-5xl font-bold">
              {stats.approvedBusinesses}
            </p>
          </div>
        </div>

        <div className="card bg-secondary text-secondary-content shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Campaigns</h2>
            <p className="text-5xl font-bold">
              {stats.totalCampaigns}
            </p>
          </div>
        </div>

        <div className="card bg-accent text-accent-content shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Notifications</h2>
            <p className="text-5xl font-bold">
              {stats.totalNotifications}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardHome;