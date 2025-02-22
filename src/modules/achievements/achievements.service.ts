import { Injectable } from '@nestjs/common';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { Prisma } from '@prisma/client';
import { AchievementEntity } from './entities/achievement.entity';

@Injectable()
export class AchievementsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createAchievementDto: CreateAchievementDto) {
    const { players, teams, ...rest } = createAchievementDto;
    return this.prisma.achievement.create({
      data: {
        ...rest,
        players: {
          connect: players.map((playerId) => ({ id: playerId })),
        },
        teams: {
          connect: teams.map((teamId) => ({ id: teamId })),
        },
      },
    });
  }

  async findPaginated(
    playerId: number,
    teamId: number,
    tournamentId: number,
    pagination: PaginationDto,
  ): Promise<PaginatedResponseDto<AchievementEntity>> {
    const { current = 1, pageSize = 10, orderBy = 'id', sortOrder = 'desc' } = pagination;
    const skip = (current - 1) * pageSize;
    const take = pageSize;
    const whereConditions: Prisma.AchievementWhereInput = {};
    if (playerId) {
      whereConditions.players = { some: { id: playerId } };
    }
    if (teamId) {
      whereConditions.teams = { some: { id: teamId } };
    }
    if (tournamentId) {
      whereConditions.tournamentId = { equals: tournamentId };
    }
    const listPromise = this.prisma.achievement.findMany({
      where: whereConditions,
      include: {
        teams: {
          select: {
            id: true,
            name: true,
          },
        },
        tournament: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      take,
      skip,
      orderBy: orderBy ? { [orderBy]: sortOrder } : undefined,
    });
    const totalPromise = this.prisma.achievement.count({
      where: whereConditions,
    });
    const [list, total] = await Promise.all([listPromise, totalPromise]);

    return {
      list,
      total,
    };
  }

  findOne(id: number) {
    return this.prisma.achievement.findUnique({
      where: { id },
    });
  }

  update(id: number, updateAchievementDto: UpdateAchievementDto) {
    const { players, teams, ...rest } = updateAchievementDto;
    return this.prisma.achievement.update({
      where: { id },
      data: {
        ...rest,
        players: {
          set: players.map((playerId) => ({ id: playerId })),
        },
        teams: {
          set: teams.map((teamId) => ({ id: teamId })),
        },
      },
    });
  }

  async remove(id: number) {
    // 删除achievement时，先删除相关teams、players
    await this.prisma.achievement.update({
      where: { id },
      data: {
        teams: {
          deleteMany: {},
        },
        players: {
          deleteMany: {},
        },
      },
    });
    return this.prisma.achievement.delete({
      where: { id },
    });
  }
}
