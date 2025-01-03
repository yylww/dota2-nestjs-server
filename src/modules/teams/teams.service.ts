import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from '../prisma/prisma.service';
import { TeamEntity } from './entities/team.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TeamsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createTeamDto: CreateTeamDto): Promise<TeamEntity> {
    return this.prisma.team.create({ data: createTeamDto });
  }

  async findPaginated(
    id: number,
    name: string,
    regionId: number,
    pagination: PaginationDto,
  ): Promise<PaginatedResponseDto<TeamEntity>> {
    const { current = 1, pageSize = 10, orderBy, sortOrder } = pagination;
    const skip = (current - 1) * pageSize;
    const take = pageSize;
    const whereConditions: Prisma.TeamWhereInput = {};
    if (id) {
      whereConditions.id = { equals: id };
    }
    if (name) {
      whereConditions.OR = [
        { name: { contains: name, mode: 'insensitive' } },
        { tag: { contains: name, mode: 'insensitive' } },
      ];
    }
    if (regionId) {
      whereConditions.regionId = { equals: regionId };
    }
    const listPromise = this.prisma.team.findMany({
      where: whereConditions,
      include: {
        region: {
          select: {
            name: true,
          },
        },
        players: {
          select: {
            nickname: true,
            position: true,
          },
        },
      },
      take,
      skip,
      orderBy: orderBy ? { [orderBy]: sortOrder } : undefined,
    });
    const totalPromise = this.prisma.team.count({
      where: whereConditions,
    });
    const [list, total] = await Promise.all([listPromise, totalPromise]);

    return {
      list,
      total,
    };
  }

  findOne(id: number): Promise<TeamEntity> {
    return this.prisma.team.findUnique({ where: { id } });
  }

  update(updateTeamDto: UpdateTeamDto): Promise<TeamEntity> {
    return this.prisma.team.update({
      where: { id: updateTeamDto.id },
      data: updateTeamDto,
    });
  }

  remove(id: number): Promise<TeamEntity> {
    return this.prisma.team.delete({ where: { id } });
  }
}
