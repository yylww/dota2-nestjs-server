import { PartialType } from '@nestjs/swagger';
import { CreateStageDto } from './create-stage.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateStageDto extends PartialType(CreateStageDto) {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
