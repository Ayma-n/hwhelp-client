import React, { useContext, useState, useEffect, FC } from "react";
import { db } from "../FirebaseInit";
import {
  collection,
  addDoc,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";
import {Person, nullPerson, IDBContext, nullDBContext} from "../types/DBTypes";


const DatabaseContext: React.Context<IDBContext> = React.createContext(nullDBContext);

export function useDb() {
  return useContext(DatabaseContext);
}

export const DatabaseProvider: FC = ({ children }) => {
  const { userInfo } = useAuth();
  const currentUser = userInfo?.currentUser;

  function createUser(userObject: Person) {
    const collectionName = userObject.role === 'student' ? '/students' : '/tutors';
    const profilesRef = collection(db, collectionName);
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
