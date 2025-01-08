import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiQuery } from '@nestjs/swagger';
import { ApiPagination } from 'src/common/decorators/api-pagination.decorator';
import { ApiOkResponsePaginated } from 'src/common/decorators/paginated-response.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AchievementEntity } from './entities/achievement.entity';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';

@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Post()
  create(@Body() createAchievementDto: CreateAchievementDto) {
    return this.achievementsService.create(createAchievementDto);
  }

  @Public()
  @Get()
  @ApiQuery({ name: 'playerId', type: Number, required: false })
  @ApiQuery({ name: 'teamId', type: Number, required: false })
  @ApiQuery({ name: 'tournamentId', type: Number, required: false })
  @ApiPagination()
  @ApiOkResponsePaginated(AchievementEntity)
  async findPaginated(
    @Query() pagination: PaginationDto,
    @Query('playerId') playerId?: string,
    @Query('teamId') teamId?: string,
    @Query('tournamentId') tournamentId?: string,
  ): Promise<PaginatedResponseDto<AchievementEntity>> {
    return this.achievementsService.findPaginated(+playerId, +teamId, +tournamentId, pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.achievementsService.findOne(+id);
  }

  @Patch()
  update(@Body() updateAchievementDto: UpdateAchievementDto) {
    return this.achievementsService.update(updateAchievementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.achievementsService.remove(+id);
  }
}
