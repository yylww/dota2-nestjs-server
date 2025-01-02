import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { ApiBearerAuth, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { HeroEntity } from './entities/hero.entity';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiOkResponsePaginated } from 'src/common/decorators/paginated-response.decorator';
import { ApiPagination } from 'src/common/decorators/api-pagination.decorator';
import { HeroesService } from './heroes.service';

@ApiBearerAuth()
@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Post()
  @ApiOkResponse({ type: HeroEntity })
  create(@Body() createHeroDto: CreateHeroDto): Promise<HeroEntity> {
    return this.heroesService.createHero(createHeroDto);
  }

  @Get()
  @ApiQuery({ name: 'id', type: String, required: false })
  @ApiQuery({ name: 'cname', type: String, required: false })
  @ApiQuery({ name: 'name', type: String, required: false })
  @ApiPagination()
  @ApiOkResponsePaginated(HeroEntity)
  async findFiltered(
    @Query() pagination: PaginationDto,
    @Query('id') id?: string,
    @Query('cname') cname?: string,
    @Query('name') name?: string,
  ): Promise<PaginatedResponseDto<HeroEntity>> {
    return this.heroesService.getHeroes(+id, cname, name, pagination);
  }

  @Get(':id')
  @ApiOkResponse({ type: HeroEntity })
  findOne(@Param('id') id: number): Promise<HeroEntity> {
    return this.heroesService.getHero(+id);
  }

  @Put()
  @ApiOkResponse({ type: HeroEntity })
  update(@Body() updateHeroDto: UpdateHeroDto) {
    return this.heroesService.updateHero(updateHeroDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: HeroEntity })
  delete(@Param('id') id: number): Promise<HeroEntity> {
    return this.heroesService.deleteHero(+id);
  }
}
