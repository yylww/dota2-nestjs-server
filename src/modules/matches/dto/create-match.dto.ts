import { IsBoolean, IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMatchDto {
  @IsDateString()
  @IsNotEmpty()
  startTime: string;

  @IsNumber()
  @IsNotEmpty()
  status: number;

  @IsNumber()
  @IsNotEmpty()
  bo: number;

  @IsNumber()
  @IsNotEmpty()
  type: number;

  @IsBoolean()
  @IsNotEmpty()
  extra: boolean;

  @IsNumber()
  @IsNotEmpty()
  group: number;

  @IsNumber()
  @IsNotEmpty()
  homeScore: number;

  @IsNumber()
  @IsNotEmpty()
  awayScore: number;

  @IsNumber()
  @IsNotEmpty()
  homeTeamId: number;

  @IsNumber()
  @IsNotEmpty()
  awayTeamId: number;

  @IsNumber()
  @IsNotEmpty()
  tournamentId: number;

  @IsNumber()
  @IsNotEmpty()
  stageId: number;
}
