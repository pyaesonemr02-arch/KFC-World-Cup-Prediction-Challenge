import React, { useEffect, useState } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/init';
import { useAuth } from '../firebase/FirebaseContext';

export default function PredictionModal({ match, onClose }: any) {
  const { rawUser } = useAuth();
  const [home, setHome] = useState(0);
  const [away, setAway] = useState(0);

  useEffect(() => {
    // load existing prediction if any - omitted for brevity
  }, []);

  async function save() {
    if (!rawUser) return;
    const predRef = doc(db, 'predictions', `${rawUser.uid}_${match.id}`);
    await setDoc(predRef, {
      userId: rawUser.uid,
      matchId: match.id,
      home,
      away,
      updatedAt: serverTimestamp()
    }, { merge: true });
    onClose();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <div className="card w-full max-w-md">
        <h3 className="font-bold mb-2">Predict: {match.homeTeam} vs {match.awayTeam}</h3>
        <div className="flex gap-2 items-center">
          <input type="number" className="w-24 p-2 rounded bg-white/6" value={home} onChange={(e) => setHome(Number(e.target.value))} />
          <span className="font-mono">-</span>
          <input type="number" className="w-24 p-2 rounded bg-white/6" value={away} onChange={(e) => setAway(Number(e.target.value))} />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 rounded bg-white/6">Cancel</button>
          <button onClick={save} className="px-3 py-1 rounded bg-kfc">Save</button>
        </div>
      </div>
    </div>
  );
}
