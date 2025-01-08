import { Player } from '@prisma/client';

export class PlayerEntity implements Player {
  id: number;
  nickname: string;
  position: string;
  status: number;
  teamId: number | null;
  createdAt: Date;
  updatedAt: Date;
}
