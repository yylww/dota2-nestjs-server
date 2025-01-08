import { PartialType } from '@nestjs/swagger';
import { CreateAchievementDto } from './create-achievement.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateAchievementDto extends PartialType(CreateAchievementDto) {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
