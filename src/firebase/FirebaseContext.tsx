import React, { createContext, useContext, useEffect, useState } from 'react';
import init, { auth, db } from './init';
import {
  onAuthStateChanged,
  signInAnonymously,
  User as FirebaseUser
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import type { UserProfile } from '../types';

init;

const FirebaseContext = createContext<any>(null);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [rawUser, setRawUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setRawUser(u);
      if (!u) {
        // sign in anonymously for demonstration (replace with real flow if required)
        await signInAnonymously(auth);
        return;
      }
      // Fetch profile in users collection:
      const docRef = doc(db, 'users', u.uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setUser(snap.data() as UserProfile);
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, []);

  const value = { user, setUser, rawUser, auth, db };
  return <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>;
}

export const useAuth = () => useContext(FirebaseContext);
