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
    const { players, ...rest } = createTeamDto;
    return this.prisma.team.create({
      data: {
        ...rest,
        players: {
          connect: players.map((id) => ({ id })),
        },
      },
    });
  }

  findAll(): Promise<TeamEntity[]> {
    return this.prisma.team.findMany({
      include: {
        players: {
          select: {
            id: true,
          },
        },
      },
    });
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
            cname: true,
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
    return this.prisma.team.findUnique({
      where: { id },
      include: {
        players: true,
      },
    });
  }

  update(id: number, updateTeamDto: UpdateTeamDto): Promise<TeamEntity> {
    const { players, ...rest } = updateTeamDto;
    return this.prisma.team.update({
      where: { id },
      data: {
        ...rest,
        players: {
          set: players.map((id) => ({ id })),
        },
      },
    });
  }

  remove(id: number): Promise<TeamEntity> {
    return this.prisma.team.delete({ where: { id } });
  }
}
