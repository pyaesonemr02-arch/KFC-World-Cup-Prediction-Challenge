import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp, writeBatch, doc } from 'firebase/firestore';
import { db } from '../firebase/init';

export default function AdminPanel() {
  const [jsonText, setJsonText] = useState('');

  async function importMatches() {
    try {
      const matches = JSON.parse(jsonText);
      const batch = writeBatch(db);
      for (const m of matches) {
        const d = doc(collection(db, 'matches'));
        batch.set(d, { ...m, createdAt: serverTimestamp() });
      }
      await batch.commit();
      alert('Imported');
    } catch (err) {
      alert('Invalid JSON');
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Admin Panel</h2>
      <section className="card">
        <h3 className="font-semibold">Import matches (JSON)</h3>
        <textarea rows={8} className="w-full p-2 bg-white/6 rounded" value={jsonText} onChange={(e) => setJsonText(e.target.value)} />
        <div className="flex gap-2 mt-2">
          <button onClick={importMatches} className="px-3 py-1 bg-kfc rounded">Import</button>
        </div>
      </section>
    </div>
  );
}
