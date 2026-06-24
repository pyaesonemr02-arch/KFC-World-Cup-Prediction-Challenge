import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/init';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../firebase/FirebaseContext';

export default function Login() {
  const [name, setName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [department, setDepartment] = useState('IT');
  const nav = useNavigate();
  const { rawUser, setUser } = useAuth();

  async function register(e: React.FormEvent) {
    e.preventDefault();
    // For simplicity, create anonymous user and write profile
    if (!rawUser) {
      alert('Please sign in via Firebase first (anonymous will be created automatically)');
      return;
    }
    const profile = {
      uid: rawUser.uid,
      name,
      employeeId,
      department,
      points: 0,
      createdAt: serverTimestamp()
    };
    await setDoc(doc(db, 'users', rawUser.uid), profile);
    setUser(profile);
    nav('/');
  }

  return (
    <div className="max-w-md mx-auto mt-16 card">
      <h1 className="text-2xl font-bold mb-4">KFC World Cup Prediction — Sign up</h1>
      <form onSubmit={register} className="space-y-3">
        <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Full name" className="w-full p-2 rounded bg-white/6" />
        <input value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} required placeholder="Employee ID" className="w-full p-2 rounded bg-white/6" />
        <select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full p-2 rounded bg-white/6">
          <option>IT</option>
          <option>Operations</option>
          <option>Finance</option>
          <option>HR</option>
        </select>
        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-kfc rounded">Register</button>
        </div>
      </form>
    </div>
  );
}
