import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAchievementDto {
  @IsString()
  @IsNotEmpty()
  rank: string;

  @IsNumber()
  @IsNotEmpty()
  bonus: number;

  @IsNumber()
  @IsOptional()
  point?: number;

  @IsNumber()
  @IsNotEmpty()
  tournamentId: number;

  @IsArray()
  @IsNotEmpty()
  players: number[];

  @IsArray()
  @IsNotEmpty()
  teams: number[];
}
