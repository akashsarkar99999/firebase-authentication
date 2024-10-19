import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import {signInWithEmailAndPassword } from "firebase/auth";

import {sendPasswordResetEmail } from "firebase/auth";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const AuthContext = createContext(null);


const AuthProvider = ({children}) => {


    const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () =>{

    setLoading(true);
    
    return signInWithPopup(auth, googleProvider)
  }


    const [loading, setLoading] = useState(true)

    const [user, setUser] = useState(null);

    const creatUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const signIn = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    };

    const resetPass = (email) =>{
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    };

    useEffect(()=>{
       const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            setLoading(false)
        });
        return ()=>{
            unSubscribe();
        }
    } ,[]);

    const logOut = () =>{
        setLoading(true)
       return signOut(auth)
    }

    const authInfo = {user,
        creatUser,
        signIn,
        resetPass,
        logOut,
        loading,
        signInWithGoogle
    };


    return (

        <AuthContext.Provider value={authInfo}>
            {children}
            
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes={
    children:PropTypes.node
}


// 1.Creat Context
// 2.set provider with value
// 3.use the auth provider in the main.jsx file 
// 4.access children in the authprovider component as a childeren and use in the middle of the provider