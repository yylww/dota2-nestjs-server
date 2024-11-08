import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Hero } from '@prisma/client';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { HeroEntity } from './entities/hero.entity';

export enum OrderBy {
  Asc = 'asc',
  Desc = 'desc',
}

@ApiBearerAuth()
@Controller('heroes')
export class HeroesController {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  @Post()
  @ApiOkResponse({ type: HeroEntity })
  create(@Body() createHeroDto: CreateHeroDto): Promise<Hero> {
    return this.prisma.hero.create({
      data: createHeroDto,
    });
  }

  @Get(':id')
  @ApiOkResponse({ type: HeroEntity })
  findOne(@Param('id') id: number): Promise<Hero> {
    return this.prisma.hero.findUnique({
      where: { id },
    });
  }

  @Get()
  @ApiQuery({ name: 'take', type: Number, required: false })
  @ApiQuery({ name: 'skip', type: Number, required: false })
  @ApiQuery({ name: 'query', type: String, required: false })
  @ApiQuery({ name: 'orderBy', enum: OrderBy, required: false })
  @ApiOkResponse({ type: HeroEntity, isArray: true })
  findFiltered(
    @Query('take') take?: number,
    @Query('skip') skip?: number,
    @Query('query') query?: string,
    @Query('orderBy') orderBy?: OrderBy,
  ): Promise<Hero[]> {
    return this.prisma.hero.findMany({
      where: {
        OR: query ? [
          { id: { equals: Number(query) || undefined } },
          { name: { contains: query, mode: 'insensitive' } },
          { cname: { contains: query, mode: 'insensitive' } },
        ] : undefined,
      },
      take: take || 10,
      skip: skip || 0,
      orderBy: {
        updatedAt: orderBy,
      },
    })
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateHeroDto: UpdateHeroDto) {
    return this.prisma.hero.update({
      where: { id },
      data: updateHeroDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.prisma.hero.delete({
      where: { id },
    });
  }
}
