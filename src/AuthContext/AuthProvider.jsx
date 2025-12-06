import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../FirebaseConfig/Firebase';

const googleAuthProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    console.log(user)

    const signUpWithEP = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInWithEP = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGG = () => {
        setLoading(true);
        return signInWithPopup(auth, googleAuthProvider)
    }

    const updateUserPF = (displayName, photoURL) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {displayName, photoURL})
    }

    const signOutUser = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unsubscribe();
        }
    }, [])

    const userInfo = {
        user,
        loading,
        setLoading,
        signUpWithEP,
        signInWithEP,
        signInWithGG,
        updateUserPF,
        signOutUser,
    }

    return <AuthContext value={userInfo}>{children}</AuthContext>
};

export default AuthProvider;