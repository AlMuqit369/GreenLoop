import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import axiosPublic from "../api/axiosPublic";

const useRole = () => {
  const { user } = useAuth();

  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axiosPublic.get(`/users/${user.email}`)
      .then(res => {
        setRole(res.data.role);
        setLoading(false);
      });
  }, [user]);

  return [role, loading];
};

export default useRole;