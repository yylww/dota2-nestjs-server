import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { ApiQuery } from '@nestjs/swagger';
import { ApiPagination } from 'src/common/decorators/api-pagination.decorator';
import { ApiOkResponsePaginated } from 'src/common/decorators/paginated-response.decorator';
import { MatchEntity } from './entities/match.entity';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post()
  create(@Body() createMatchDto: CreateMatchDto) {
    return this.matchesService.create(createMatchDto);
  }

  @Get('all')
  findAll() {
    return this.matchesService.findAll();
  }

  @Get()
  @ApiQuery({ name: 'id', type: String, required: false })
  @ApiQuery({ name: 'title', type: String, required: false })
  @ApiPagination()
  @ApiOkResponsePaginated(MatchEntity)
  async findPaginated(
    @Query() pagination: PaginationDto,
    @Query('stageId') stageId?: string,
    @Query('teamId') teamId?: string,
    @Query('status') status?: string,
  ): Promise<PaginatedResponseDto<MatchEntity>> {
    return this.matchesService.findPaginated(+stageId, +teamId, +status, pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matchesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto) {
    return this.matchesService.update(+id, updateMatchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matchesService.remove(+id);
  }
}
