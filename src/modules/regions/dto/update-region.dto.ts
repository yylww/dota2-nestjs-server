import { PartialType } from '@nestjs/swagger';
import { CreateRegionDto } from './create-region.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateRegionDto extends PartialType(CreateRegionDto) {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
