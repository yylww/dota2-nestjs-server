import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { ApiOkResponsePaginated } from 'src/common/decorators/paginated-response.decorator';
import { ApiPagination } from 'src/common/decorators/api-pagination.decorator';
import { TeamEntity } from './entities/team.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @ApiOkResponse({ type: TeamEntity })
  create(@Body() createTeamDto: CreateTeamDto): Promise<TeamEntity> {
    return this.teamsService.create(createTeamDto);
  }

  @Get('all')
  @ApiOkResponse({ type: [TeamEntity] })
  findAll(): Promise<TeamEntity[]> {
    return this.teamsService.findAll();
  }

  @Get()
  @ApiQuery({ name: 'id', type: String, required: false })
  @ApiQuery({ name: 'cname', type: String, required: false })
  @ApiQuery({ name: 'name', type: String, required: false })
  @ApiPagination()
  @ApiOkResponsePaginated(TeamEntity)
  async findPaginated(
    @Query() pagination: PaginationDto,
    @Query('id') id?: string,
    @Query('name') name?: string,
    @Query('regionId') regionId?: string,
  ): Promise<PaginatedResponseDto<TeamEntity>> {
    return this.teamsService.findPaginated(+id, name, +regionId, pagination);
  }

  @Get(':id')
  @ApiOkResponse({ type: TeamEntity })
  findOne(@Param('id') id: string): Promise<TeamEntity> {
    return this.teamsService.findOne(+id);
  }

  @Patch()
  @ApiOkResponse({ type: TeamEntity })
  update(@Body() updateTeamDto: UpdateTeamDto): Promise<TeamEntity> {
    return this.teamsService.update(updateTeamDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: TeamEntity })
  remove(@Param('id') id: string): Promise<TeamEntity> {
    return this.teamsService.remove(+id);
  }
}
