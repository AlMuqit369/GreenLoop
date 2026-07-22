import React from "react";
import { Link } from "react-router";
import useRole from "../hooks/useRole";

const Sidebar = () => {
  const [role, loading] = useRole();

  if (loading) {
    return (
      <div className="w-72 min-h-full bg-green-700 text-white flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <ul className="menu p-4 w-72 min-h-full bg-green-700 text-white">

      <h2 className="text-3xl font-bold mb-8">
        GreenLoop
      </h2>

      {/* Everyone */}
      <li>
        <Link to="/dashboard">
          Dashboard
        </Link>
      </li>

      <li>
        <Link to="/">
          Home
        </Link>
      </li>

      {/* Admin Only */}
      {role === "Admin" && (
        <>
          <div className="divider"></div>

          <li>
            <Link to="/dashboard/users">
              User Management
            </Link>
          </li>

          <li>
            <Link to="/dashboard/add-business">
              Add Business
            </Link>
          </li>

          <li>
            <Link to="/dashboard/businesses">
              Business Accounts
            </Link>
          </li>

          <li>
            <Link to="/dashboard/collector-performance">
              Collector Performance
            </Link>
          </li>

          <li>
            <Link to="/dashboard/campaigns">
              Community Campaigns
            </Link>
          </li>

          <li>
            <Link to="/dashboard/notifications">
              Notification Center
            </Link>
          </li>

          <li>
            <Link to="/dashboard/analytics">
              Admin Analytics
            </Link>
          </li>
        </>
      )}

      {/* Business */}
      {role === "Business" && (
        <>
          <div className="divider"></div>

          <li>
            <Link to="/dashboard/add-business">
              My Business
            </Link>
          </li>
        </>
      )}

      {/* Collector */}
      {role === "Collector" && (
        <>
          <div className="divider"></div>

          <li>
            <Link to="/dashboard/collector-performance">
              My Performance
            </Link>
          </li>
        </>
      )}

      {/* Household */}
      {role === "Household" && (
        <>
          <div className="divider"></div>

          <li>
            <Link to="/dashboard">
              My Dashboard
            </Link>
          </li>
        </>
      )}

      {/* Company */}
      {role === "Company" && (
        <>
          <div className="divider"></div>

          <li>
            <Link to="/dashboard">
              Company Dashboard
            </Link>
          </li>
        </>
      )}

    </ul>
  );
};

export default Sidebar;