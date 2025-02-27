import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { ApiQuery } from '@nestjs/swagger';
import { ApiPagination } from 'src/common/decorators/api-pagination.decorator';
import { ApiOkResponsePaginated } from 'src/common/decorators/paginated-response.decorator';
import { GameEntity } from './entities/game.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Get('all')
  findAll() {
    return this.gamesService.findAll();
  }

  @Get()
  @ApiQuery({ name: 'playerId', type: Number, required: false })
  @ApiQuery({ name: 'teamId', type: Number, required: false })
  @ApiQuery({ name: 'tournamentId', type: Number, required: false })
  @ApiPagination()
  @ApiOkResponsePaginated(GameEntity)
  async findPaginated(
    @Query() pagination: PaginationDto,
    @Query('id') id?: string,
  ): Promise<PaginatedResponseDto<GameEntity>> {
    return this.gamesService.findPaginated(id, pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
  //   return this.gamesService.update(+id, updateGameDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamesService.remove(id);
  }
}
