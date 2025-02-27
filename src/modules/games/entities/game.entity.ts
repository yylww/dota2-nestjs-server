import { Game } from '@prisma/client';

export class GameEntity implements Game {
  id: string;
  type: number;
  startTime: Date;
  duration: number;
  radiantTeamId: number;
  direTeamId: number;
  tournamentId: number;
  stageId: number;
  matchId: number;
  radiantWin: boolean;
  radiantScore: number;
  direScore: number;
  createdAt: Date;
  updatedAt: Date;
}
