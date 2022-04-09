import React, { useContext, useState, useEffect, Context } from 'react'
import { signInWithPopup, GoogleAuthProvider, User, AuthProvider, OAuthCredential, signOut, onAuthStateChanged, getAdditionalUserInfo } from 'firebase/auth'
import { auth } from '../FirebaseInit'
import { useNavigate } from 'react-router-dom';

interface IAuthContext {
    userInfo: IUserInfo | undefined;
    login: Function;
    signout: Function;
}

export interface IUserInfo {
    currentUser: any;
    additionalInfo: any;
}

const defaultState : IAuthContext = {
    userInfo: {currentUser: null, additionalInfo: null},
    login: () => null,
    signout: () => null,
}

const AuthContext : React.Context<IAuthContext> = React.createContext(defaultState);

export function useAuth() {
    return useContext(AuthContext);
}

export function GAuthProvider({ children } : any) {

    const [userInfo, setUserInfo] = useState<IUserInfo>();

    const [currentUser, setCurrentUser] = useState<User>();
    const googleProvider : GoogleAuthProvider = new GoogleAuthProvider()

    const navigate = useNavigate();

    async function login() {
        return signInWithPopup(auth, googleProvider)
        .then((result) => {
            const credential : OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);
            //const token : string | undefined = credential?.accessToken;
            setUserInfo({currentUser: result.user, additionalInfo: getAdditionalUserInfo(result)});
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
        userInfo,
        login,
        signout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}

