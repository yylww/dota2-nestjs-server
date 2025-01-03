import { Controller, Get, Post, Body, Param, Delete, Query, Patch } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { ApiBearerAuth, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { HeroEntity } from './entities/hero.entity';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiOkResponsePaginated } from 'src/common/decorators/paginated-response.decorator';
import { ApiPagination } from 'src/common/decorators/api-pagination.decorator';
import { HeroesService } from './heroes.service';
import { Public } from 'src/common/decorators/public.decorator';

@ApiBearerAuth()
@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Post()
  @ApiOkResponse({ type: HeroEntity })
  create(@Body() createHeroDto: CreateHeroDto): Promise<HeroEntity> {
    return this.heroesService.create(createHeroDto);
  }

  @Public()
  @Get()
  @ApiQuery({ name: 'id', type: String, required: false })
  @ApiQuery({ name: 'cname', type: String, required: false })
  @ApiQuery({ name: 'name', type: String, required: false })
  @ApiPagination()
  @ApiOkResponsePaginated(HeroEntity)
  async findPaginated(
    @Query() pagination: PaginationDto,
    @Query('id') id?: string,
    @Query('cname') cname?: string,
    @Query('name') name?: string,
  ): Promise<PaginatedResponseDto<HeroEntity>> {
    return this.heroesService.findPaginated(+id, cname, name, pagination);
  }

  @Public()
  @Get(':id')
  @ApiOkResponse({ type: HeroEntity })
  findOne(@Param('id') id: number): Promise<HeroEntity> {
    return this.heroesService.findOne(+id);
  }

  @Patch()
  @ApiOkResponse({ type: HeroEntity })
  update(@Body() updateHeroDto: UpdateHeroDto) {
    return this.heroesService.update(updateHeroDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: HeroEntity })
  remove(@Param('id') id: number): Promise<HeroEntity> {
    return this.heroesService.remove(+id);
  }
}
