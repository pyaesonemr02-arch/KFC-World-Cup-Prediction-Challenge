export type Department = 'IT' | 'Operations' | 'Finance' | 'HR';

export type UserProfile = {
  uid: string;
  name: string;
  employeeId: string;
  department: Department;
  points: number;
  createdAt?: any;
  isAdmin?: boolean;
};

export type Match = {
  id: string;
  homeTeam: string;
  awayTeam: string;
  kickoff: string; // ISO
  finalScore?: { home: number; away: number };
  group?: string;
};

export type Prediction = {
  id?: string;
  userId: string;
  matchId: string;
  home: number;
  away: number;
  createdAt?: any;
  updatedAt?: any;
  pointsAwarded?: number;
  isLocked?: boolean;
};
