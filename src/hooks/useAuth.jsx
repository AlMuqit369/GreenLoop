import React from "react";
import { AuthContext } from "../context/AuthContex/AuthContex";

const useAuth = () => {
    const authInfo = use(AuthContext)
    return authInfo;
};

export default useAuth;