import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request } from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { PrismaService } from '../prisma/prisma.service';

@Controller('heroes')
export class HeroesController {
  constructor(
    private readonly heroesService: HeroesService,
    private readonly prisma: PrismaService,
  ) {}

  @Post()
  create(@Body() createHeroDto: CreateHeroDto) {
    return this.heroesService.create(createHeroDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prisma.hero.findUnique({
      where: { id },
    });
  }

  @Get()
  findFiltered(
    @Request() req: any,
    @Query('take') take?: number,
    @Query('skip') skip?: number,
    @Query('query') query?: string,
    @Query('orderBy') orderBy?: 'asc' | 'desc',
    @Query('ids') ids?: number[],
  ) {
    console.log(req.user);
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
  update(@Param('id') id: string, @Body() updateHeroDto: UpdateHeroDto) {
    return this.prisma.hero.update({
      where: {
        id: +id,
      },
      data: updateHeroDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.heroesService.remove(+id);
  }
}
