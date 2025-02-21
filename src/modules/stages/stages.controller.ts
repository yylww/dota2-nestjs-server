import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StagesService } from './stages.service';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
import { ApiQuery } from '@nestjs/swagger';
import { ApiPagination } from 'src/common/decorators/api-pagination.decorator';
import { ApiOkResponsePaginated } from 'src/common/decorators/paginated-response.decorator';
import { StageEntity } from './entities/stage.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';

@Controller('stages')
export class StagesController {
  constructor(private readonly stagesService: StagesService) {}

  @Post()
  create(@Body() createStageDto: CreateStageDto) {
    return this.stagesService.create(createStageDto);
  }

  @Get('all')
  findAll() {
    return this.stagesService.findAll();
  }

  @Get()
  @ApiQuery({ name: 'id', type: String, required: false })
  @ApiQuery({ name: 'title', type: String, required: false })
  @ApiPagination()
  @ApiOkResponsePaginated(StageEntity)
  async findPaginated(
    @Query() pagination: PaginationDto,
    @Query('tournamentId') tournamentId?: string,
  ): Promise<PaginatedResponseDto<StageEntity>> {
    return this.stagesService.findPaginated(+tournamentId, pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStageDto: UpdateStageDto) {
    return this.stagesService.update(+id, updateStageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stagesService.remove(+id);
  }
}
