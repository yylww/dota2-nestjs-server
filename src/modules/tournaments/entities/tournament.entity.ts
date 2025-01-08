import { Tournament } from '@prisma/client';

export class TournamentEntity implements Tournament {
  id: number;
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
