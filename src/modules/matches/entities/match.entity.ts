import { Match } from '@prisma/client';

export class MatchEntity implements Match {
  id: number;
  startTime: Date;
  status: number;
  bo: number;
  type: number;
  group: number;
  extra: boolean;
  homeScore: number;
  awayScore: number;
  createdAt: Date;
  updatedAt: Date;
  tournamentId: number;
  stageId: number;
  homeTeamId: number;
  awayTeamId: number;
  relateMatchId: number | null;
}
