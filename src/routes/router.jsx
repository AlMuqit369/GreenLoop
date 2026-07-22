import { createBrowserRouter } from "react-router";

import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/Home/Home/Home";

import Login from "../pages/Auth/login/Login";
import Register from "../pages/Auth/Register/Register";

import DashboardHome from "../pages/Dashboard/DashboardHome";

import AddBusiness from "../pages/Business/AddBusiness";
import BusinessAccounts from "../pages/Business/BusinessAccounts";
import AdminAnalytics from "../pages/Analytics/AdminAnalytics";

import PrivateRoute from "./PrivateRoute";
import Campaigns from "../pages/Campaign/Campaigns";
import CollectorPerformance from "../pages/Collector/CollectorPerformance";
import NotificationCenter from "../pages/Notification/NotificationCenter";
import UserManagement from "../pages/Admin/UserManagement";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },

  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },

      {
        path: "add-business",
        Component: AddBusiness,
      },

      {
        path: "businesses",
        element: (
          <AdminRoute>
            <BusinessAccounts />
          </AdminRoute>
        ),
      },

      {
        path: "analytics",
        element: (
          <AdminRoute>
            <AdminAnalytics />
          </AdminRoute>
        ),
      },
      {
        path: "campaigns",
        element: (
          <AdminRoute>
            <Campaigns />
          </AdminRoute>
        ),
      },
      {
        path: "collector-performance",
        element: (
          <AdminRoute>
            <CollectorPerformance />
          </AdminRoute>
        ),
      },
      {
        path: "notifications",
        element: (
          <AdminRoute>
            <NotificationCenter />
          </AdminRoute>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <UserManagement />
          </AdminRoute>
        ),
      },
    ],
  },
]);