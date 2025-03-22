import { Tournament } from '@prisma/client';

export class TournamentEntity implements Tournament {
  id: number;
  leagueId: number | null;
  status: number; // 0: 未开始, 1: 进行中, 2: 已结束
  title: string;
  title_en: string;
  description: string;
  description_en: string;
  logo: string;
  startDate: Date;
  endDate: Date;
  bonus: number;
  createdAt: Date;
  updatedAt: Date;
}
