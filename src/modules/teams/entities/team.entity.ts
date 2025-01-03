import { Team } from '@prisma/client';

export class TeamEntity implements Team {
  id: number;
  name: string;
  tag: string | null;
  logo: string;
  regionId: number;
  status: number;
  createdAt: Date;
  updatedAt: Date;
}
