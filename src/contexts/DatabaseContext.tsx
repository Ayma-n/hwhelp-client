import React, { useContext, useState, useEffect, FC } from "react";
import { db } from "../FirebaseInit";
import {
  collection,
  addDoc,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";
import {Person, nullPerson} from "./types/DBTypes";


const DatabaseContext: React.Context<Person> = React.createContext(nullPerson);

export function useDb() {
  return useContext(DatabaseContext);
}

export const DatabaseProvider: FC = ({ children }) => {
  const { userInfo } = useAuth();
  const currentUser = userInfo?.currentUser;

  function createUser(userObject: any) {
    const profilesRef = collection(db, "/profiles");
    return addDoc(profilesRef, userObject);
  }

  const value: any = {
    createUser,
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}
