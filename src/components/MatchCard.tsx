import React, { useState } from 'react';
import type { Match } from '../types';
import PredictionModal from './PredictionModal';

export default function MatchCard({ match }: { match: Match & { id: string } }) {
  const [open, setOpen] = useState(false);

  const kickoff = new Date(match.kickoff);
  const locked = Date.now() > kickoff.getTime() - 30 * 60 * 1000;

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-bold">{match.homeTeam} vs {match.awayTeam}</div>
          <div className="text-sm opacity-70">{kickoff.toLocaleString()}</div>
        </div>
        <div className="text-right">
          {match.finalScore ? (
            <div className="text-2xl font-mono">{match.finalScore.home} - {match.finalScore.away}</div>
          ) : (
            <div className="text-sm opacity-60">Not played</div>
          )}
          <div className="mt-2">
            <button onClick={() => setOpen(true)} disabled={locked} className={`px-3 py-1 rounded ${locked ? 'opacity-50 cursor-not-allowed' : 'bg-kfc'}`}>
              {locked ? 'Locked' : 'Predict'}
            </button>
          </div>
        </div>
      </div>

      {open && <PredictionModal match={match} onClose={() => setOpen(false)} />}
    </div>
  );
}
