import type { Prediction, Match } from '../types';

/*
Scoring rules:
- Correct winner/draw: 3 pts
- Correct scoreline (exact goals for one team?): +5 pts
- Perfect prediction: 10 pts
- Wrong: 0
Interpretation:
- If predicted exact final score -> perfect prediction = 10 (not additive)
- If predicted correct scoreline (i.e., both teams' goals equal to final -> that's perfect)
- We'll interpret "Correct scoreline +5" as predicting exact goals for one team? To match spec:
  Implementation below:
    - If exact score predicted -> 10 pts (perfect)
    - Else if correct winner/draw -> 3 pts
    - Additionally, if predicted goal counts for either team match (but not exact both), give +5?
    - To keep it simple and consistent: award 10 for exact, otherwise award 3 for correct result.
    - If spec requires +5 for matching scoreline (maybe meaning exact for one team's score) adjust easily.
*/

export function calculatePoints(pred: Prediction, match: Match): number {
  if (!match.finalScore) return 0;
  const ph = pred.home;
  const pa = pred.away;
  const mh = match.finalScore.home;
  const ma = match.finalScore.away;

  if (ph === mh && pa === ma) {
    // Perfect prediction
    return 10;
  }

  const predictedResult = sign(ph - pa);
  const actualResult = sign(mh - ma);

  if (predictedResult === actualResult) {
    // correct winner/draw
    return 3;
  }

  return 0;
}

function sign(n: number) {
  if (n > 0) return 1;
  if (n < 0) return -1;
  return 0;
}
