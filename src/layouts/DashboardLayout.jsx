import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content bg-base-100 min-h-screen">

        {/* Mobile Navbar */}
        <div className="navbar bg-base-200 lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost"
            >
              ☰
            </label>
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold">
              GreenLoop Dashboard
            </h2>
          </div>
        </div>

        <div className="p-6">
          <Outlet />
        </div>

      </div>

      {/* Sidebar */}
      <div className="drawer-side">

        <label
          htmlFor="dashboard-drawer"
          className="drawer-overlay"
        ></label>

        <Sidebar />

      </div>
    </div>
  );
};

export default DashboardLayout;