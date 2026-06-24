import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase/init';
import { useAuth } from '../firebase/FirebaseContext';
import MatchCard from '../components/MatchCard';
import Leaderboard from '../components/Leaderboard';

export default function Dashboard() {
  const [matches, setMatches] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    async function load() {
      const q = query(collection(db, 'matches'), orderBy('kickoff', 'asc'));
      const snaps = await getDocs(q);
      setMatches(snaps.docs.map((d) => ({ id: d.id, ...d.data() })));
    }
    load();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Welcome, {user?.name}</h2>
          <p className="text-sm opacity-80">Points: {user?.points ?? 0} • Department: {user?.department}</p>
        </div>
        <div>
          <Leaderboard compact />
        </div>
      </header>

      <section>
        <h3 className="text-xl font-semibold mb-4">Upcoming matches</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {matches.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>
      </section>
    </div>
  );
}
