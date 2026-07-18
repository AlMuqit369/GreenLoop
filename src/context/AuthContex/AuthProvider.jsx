import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import React, { useEffect, useState } from "react";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
    const [user, setUser] =useState(null);
    const [loading, setLoading] = useState(true);
    const registerUser=(email,password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email, password)
    }
    const signInUser = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    useEffect(() =>{

    },[])
    const authInfo = {
        user,
        loading,
        registerUser,
        signInUser,
        signInGoogle
    }
    return (
        <AuthContext value={}>
            {children}
        </AuthContext>
    );
}

export default AuthProvider;