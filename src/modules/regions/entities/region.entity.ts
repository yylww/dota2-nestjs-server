import { Region } from '@prisma/client';

export class RegionEntity implements Region {
  id: number;
  name: string;
  cname: string;
  createdAt: Date;
  updatedAt: Date;
}
