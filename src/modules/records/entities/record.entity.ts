import { Record } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';

export class RecordEntity implements Record {
  id: number;
  playerId: number;
  gameId: string;
  heroId: number;
  radiant: boolean;
  win: boolean;
  xpm: number;
  gpm: number;
  kills: number;
  deaths: number;
  assists: number;
  level: number;
  heroDamage: number;
  towerDamage: number;
  lastHits: number;
  denies: number;
  netWorth: number;
  healing: number;
  items: JsonValue;
  createdAt: Date;
  updatedAt: Date;
}
