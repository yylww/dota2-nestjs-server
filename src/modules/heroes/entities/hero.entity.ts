import { Hero } from '@prisma/client';

export class HeroEntity implements Hero {
  id: number;
  name: string;
  cname: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}
