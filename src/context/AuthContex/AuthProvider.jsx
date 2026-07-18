import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";

const AuthProvider = ({children}) => {
    const registerUser=(email,password) =>{
        return createUserWithEmailAndPassword(auth,email, password)
    }
    const signInUser = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password)
    }
    const authInfo = {
        registerUser,
        signInUser
    }
    return (
        <AuthContext value={}>
            {children}
        </AuthContext>
    );
}

export default AuthProvider;