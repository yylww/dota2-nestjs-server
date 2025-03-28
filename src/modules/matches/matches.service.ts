import { Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { MatchEntity } from './entities/match.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class MatchesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createMatchDto: CreateMatchDto) {
    return this.prisma.match.create({ data: createMatchDto });
  }

  findAll() {
    return this.prisma.match.findMany();
  }

  async findPaginated(
    stageId: number,
    teamId: number,
    status: number,
    pagination: PaginationDto,
  ): Promise<PaginatedResponseDto<MatchEntity>> {
    const { current = 1, pageSize = 10, orderBy = 'id', sortOrder = 'desc' } = pagination;
    const skip = (current - 1) * pageSize;
    const take = pageSize;
    const whereConditions: Prisma.MatchWhereInput = {};
    if (stageId) {
      whereConditions.stageId = { equals: stageId };
    }
    if (teamId) {
      whereConditions.OR = [{ homeTeamId: { equals: teamId } }, { awayTeamId: { equals: teamId } }];
    }
    if ([0, 1, 2].includes(status)) {
      whereConditions.status = { equals: status };
    }
    const listPromise = this.prisma.match.findMany({
      where: whereConditions,
      include: {
        tournament: {
          select: {
            id: true,
            title: true,
          },
        },
        stage: {
          select: {
            id: true,
            title: true,
          },
        },
        homeTeam: {
          select: {
            tag: true,
            players: true,
          },
        },
        awayTeam: {
          select: {
            tag: true,
            players: true,
          },
        },
      },
      take,
      skip,
      orderBy: orderBy ? { [orderBy]: sortOrder } : { id: 'desc' },
    });
    const totalPromise = this.prisma.match.count({
      where: whereConditions,
    });
    const [list, total] = await Promise.all([listPromise, totalPromise]);

    return {
      list,
      total,
    };
  }

  findOne(id: number) {
    return this.prisma.match.findUnique({
      where: { id },
    });
  }

  update(id: number, updateMatchDto: UpdateMatchDto) {
    return this.prisma.match.update({
      where: { id },
      data: updateMatchDto,
    });
  }

  remove(id: number) {
    return this.prisma.match.delete({
      where: { id },
    });
  }
}
