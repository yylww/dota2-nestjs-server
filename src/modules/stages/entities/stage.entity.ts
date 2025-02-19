import { Stage } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';

export class StageEntity implements Stage {
  id: number;
  title: string;
  title_en: string;
  rule: string;
  rule_en: string;
  tournamentId: number;
  mode: number;
  bo: number;
  type: number;
  groups: JsonValue;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
