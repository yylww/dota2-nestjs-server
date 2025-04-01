import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRecordDto {
  @IsNumber()
  @IsNotEmpty()
  playerId: number;

  @IsString()
  @IsNotEmpty()
  gameId: string;

  @IsNumber()
  @IsNotEmpty()
  heroId: number;

  @IsBoolean()
  @IsNotEmpty()
  radiant: boolean;

  @IsBoolean()
  @IsNotEmpty()
  win: boolean;

  @IsNumber()
  @IsNotEmpty()
  xpm: number;

  @IsNumber()
  @IsNotEmpty()
  gpm: number;

  @IsNumber()
  @IsNotEmpty()
  kills: number;

  @IsNumber()
  @IsNotEmpty()
  deaths: number;

  @IsNumber()
  @IsNotEmpty()
  assists: number;

  @IsNumber()
  @IsNotEmpty()
  level: number;

  @IsNumber()
  @IsNotEmpty()
  heroDamage: number;

  @IsNumber()
  @IsNotEmpty()
  towerDamage: number;

  @IsNumber()
  @IsNotEmpty()
  lastHits: number;

  @IsNumber()
  @IsNotEmpty()
  denies: number;

  @IsNumber()
  @IsNotEmpty()
  netWorth: number;

  @IsNumber()
  @IsNotEmpty()
  healing: number;

  @IsOptional()
  @IsArray()
  items: object;
}
