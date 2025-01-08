import { PartialType } from '@nestjs/swagger';
import { CreateTournamentDto } from './create-tournament.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateTournamentDto extends PartialType(CreateTournamentDto) {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
