import React, { useContext, useState, useEffect, Context } from 'react'
import { signInWithPopup, GoogleAuthProvider, User, AuthProvider, OAuthCredential, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../FirebaseInit'

interface IAuthContext {
    currentUser: any;
    login: Function;
    signout: Function;
}

const defaultState : IAuthContext = {
    currentUser: null,
    login: () => null,
    signout: () => null,
}

const AuthContext : React.Context<IAuthContext> = React.createContext(defaultState);

export function useAuth() {
    return useContext(AuthContext);
}

export function GAuthProvider({ children } : any) {

    const [currentUser, setCurrentUser] = useState<User>();
    const googleProvider : GoogleAuthProvider = new GoogleAuthProvider()

    function login() {
        signInWithPopup(auth, googleProvider)
        .then((result) => {
            const credential : OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);
            const token : string | undefined = credential?.accessToken;
            setCurrentUser(result.user);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        })
    }

    function signout() {
        return signOut(auth);
    }

    const value : IAuthContext = {
        currentUser,
        login,
        signout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}

