import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/init';
import { useAuth } from '../firebase/FirebaseContext';

export default function Leaderboard({ compact }: { compact?: boolean }) {
  const [leaders, setLeaders] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    async function load() {
      const q = query(collection(db, 'users'), orderBy('points', 'desc'), limit(10));
      const snaps = await getDocs(q);
      setLeaders(snaps.docs.map((d) => d.data()));
    }
    load();
  }, []);

  return (
    <div className={compact ? 'card p-3' : 'card p-4'}>
      <h4 className="font-bold">Top Predictors</h4>
      <ol className="mt-2 space-y-1">
        {leaders.map((l, idx) => (
          <li key={l.uid} className={`flex justify-between ${l.uid === user?.uid ? 'font-bold bg-white/6 p-2 rounded' : ''}`}>
            <span>{idx + 1}. {l.name} ({l.department})</span>
            <span>{l.points ?? 0}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
