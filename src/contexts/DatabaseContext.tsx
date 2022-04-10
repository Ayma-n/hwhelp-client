import React, { useContext, useState, useEffect, FC } from "react";
import { db } from "../FirebaseInit";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
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
    const collectionName = '/People';
    const profilesRef = collection(db, collectionName);
    return addDoc(profilesRef, userObject);
  }

  async function getProfileData(uid: string) {
    const studentRef = collection(db, '/People');
    const q = query(studentRef, where("uid", "==", uid));

    const querySnapshot = await getDocs(q);
    const docs: any = [];

    querySnapshot.forEach((doc) => {
      docs.push(doc.data());
    });

    return docs[0] 
  }

  const value: any = {
    createUser,
    getProfileData,
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}
