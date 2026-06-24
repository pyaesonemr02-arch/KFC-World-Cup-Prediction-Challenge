# KFC World Cup Prediction Challenge

Features
- Employee sign-up (Name + Employee ID + Department)
- Predict match scores, locked 30 minutes before kickoff
- Points calculated per the rules
- Leaderboards: overall, weekly, monthly
- Department competition & badges
- Admin panel: import matches, set final scores, recalculate points

Local setup
1. Copy files into a new repository.
2. Create a Firebase project and enable Firestore and Authentication.
3. Copy Firebase config into `.env.local` (see `.env.example`).
4. npm install
5. npm run dev
6. Visit http://localhost:5173

Firestore collections (recommended)
- users (docId = uid): { name, employeeId, department, points, isAdmin }
- matches (auto id): { homeTeam, awayTeam, kickoff (ISO), finalScore?, group? }
- predictions (id: userId_matchId): { userId, matchId, home, away, pointsAwarded?, updatedAt }
- departments (id = name): { averagePoints, rank }
- leaderboard (optional cached aggregates)

Scoring rules implemented in src/utils/scoring.ts

Deployment
- Vercel: connect repository, set environment variables in project settings.
- GitHub Pages: build and publish the `dist` folder (see Vite docs).

Notes
- The scoring function is conservative: exact score = 10 pts; correct winner/draw = 3 pts; wrong = 0.
- You can extend scoring logic to add +5 partial scoreline bonuses (sample comment in scoring file).

Security
- Update Firestore rules to match your organization policies.
- Enforce stronger auth if needed.

If you'd like, I can:
- Push these files to the default branch instead (provide branch name).
- Expand the UI to include animations, charts, and badges.
- Add automated recalculation Cloud Function to re-score matches on finalScore update.
