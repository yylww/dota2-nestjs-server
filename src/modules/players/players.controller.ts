import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { ApiQuery } from '@nestjs/swagger';
import { ApiPagination } from 'src/common/decorators/api-pagination.decorator';
import { ApiOkResponsePaginated } from 'src/common/decorators/paginated-response.decorator';
import { PlayerEntity } from './entities/player.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Get()
  @ApiQuery({ name: 'id', type: String, required: false })
  @ApiQuery({ name: 'nickname', type: String, required: false })
  @ApiQuery({ name: 'teamId', type: String, required: false })
  @ApiPagination()
  @ApiOkResponsePaginated(PlayerEntity)
  async findPaginated(
    @Query() pagination: PaginationDto,
    @Query('id') id?: string,
    @Query('nickname') nickname?: string,
    @Query('teamId') teamId?: string,
  ): Promise<PaginatedResponseDto<PlayerEntity>> {
    return this.playersService.findPaginated(+id, nickname, +teamId, pagination);
  }

  @Get('all')
  findAll(): Promise<PlayerEntity[]> {
    return this.playersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(+id);
  }

  @Patch()
  update(@Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update(updatePlayerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playersService.remove(+id);
  }
}
