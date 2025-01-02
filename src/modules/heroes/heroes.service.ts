import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { HeroEntity } from './entities/hero.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { Prisma } from '@prisma/client';
import { UpdateHeroDto } from './dto/update-hero.dto';

@Injectable()
export class HeroesService {
  constructor(private readonly prisma: PrismaService) {}

  getHero(id: number): Promise<HeroEntity> {
    return this.prisma.hero.findUnique({
      where: { id },
    });
  }

  async getHeroes(
    id: number,
    cname: string,
    name: string,
    pagination: PaginationDto,
  ): Promise<PaginatedResponseDto<HeroEntity>> {
    const { current = 1, pageSize = 10, orderBy, sortOrder } = pagination;
    const skip = (current - 1) * pageSize;
    const take = pageSize;
    const whereConditions: Prisma.HeroWhereInput = {};
    if (id) {
      whereConditions.id = { equals: id };
    }
    if (cname) {
      whereConditions.cname = { contains: cname, mode: 'insensitive' };
    }
    if (name) {
      whereConditions.name = { contains: name, mode: 'insensitive' };
    }
    const listPromise = this.prisma.hero.findMany({
      where: whereConditions,
      take,
      skip,
      orderBy: orderBy ? { [orderBy]: sortOrder } : undefined,
    });
    const totalPromise = this.prisma.hero.count({
      where: whereConditions,
    });
    const [list, total] = await Promise.all([listPromise, totalPromise]);

    return {
      list,
      total,
    };
  }

  async createHero(data: CreateHeroDto): Promise<HeroEntity> {
    return this.prisma.hero.create({
      data,
    });
  }

  async updateHero(data: UpdateHeroDto): Promise<HeroEntity> {
    return this.prisma.hero.update({
      where: { id: data.id },
      data,
    });
  }

  async deleteHero(id: number): Promise<HeroEntity> {
    return this.prisma.hero.delete({
      where: { id },
    });
  }
}
