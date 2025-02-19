import { PartialType } from '@nestjs/swagger';
import { CreateMatchDto } from './create-match.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateMatchDto extends PartialType(CreateMatchDto) {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
