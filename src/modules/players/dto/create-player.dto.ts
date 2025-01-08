import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsNotEmpty()
  @IsString()
  position: string;

  @IsNotEmpty()
  @IsNumber()
  status: number;

  @IsOptional()
  @IsNumber()
  teamId?: number;
}
