import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStageDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  title_en: string;

  @IsString()
  @IsNotEmpty()
  rule: string;

  @IsString()
  @IsNotEmpty()
  rule_en: string;

  @IsNumber()
  @IsNotEmpty()
  tournamentId: number;

  @IsNumber()
  @IsNotEmpty()
  mode: number;

  @IsNumber()
  @IsOptional()
  bo: number;

  @IsNumber()
  @IsOptional()
  type: number;

  @IsArray()
  @IsNotEmpty()
  groups: object;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;
}
