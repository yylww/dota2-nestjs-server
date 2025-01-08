import { Achievement } from '@prisma/client';

export class AchievementEntity implements Achievement {
  id: number;
  rank: string;
  bonus: number;
  point: number | null;
  tournamentId: number;
  createdAt: Date;
  updatedAt: Date;
}
