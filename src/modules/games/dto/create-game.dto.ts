import { Ban, Pick, Record } from '@prisma/client';
import { IsArray, IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsNotEmpty()
  type: number;

  @IsDateString()
  @IsNotEmpty()
  startTime: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsNumber()
  @IsNotEmpty()
  radiantScore: number;

  @IsNumber()
  @IsNotEmpty()
  direScore: number;

  @IsBoolean()
  @IsNotEmpty()
  radiantWin: boolean;

  @IsNumber()
  @IsNotEmpty()
  radiantTeamId: number;

  @IsNumber()
  @IsNotEmpty()
  direTeamId: number;

  @IsNumber()
  @IsNotEmpty()
  tournamentId: number;

  @IsNumber()
  @IsNotEmpty()
  stageId: number;

  @IsNumber()
  @IsNotEmpty()
  matchId: number;

  @IsArray()
  @IsNotEmpty()
  bans: Ban[];

  @IsArray()
  @IsNotEmpty()
  picks: Pick[];

  @IsArray()
  @IsNotEmpty()
  records: Record[];
}
