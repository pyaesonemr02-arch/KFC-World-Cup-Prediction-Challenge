import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import LeaderboardPage from './pages/LeaderboardPage';
import { useAuth } from './firebase/FirebaseContext';

export default function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 p-6">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={user?.isAdmin ? <AdminPanel /> : <Navigate to="/login" />}
        />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}
