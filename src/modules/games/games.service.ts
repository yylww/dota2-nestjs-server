import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { GameEntity } from './entities/game.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGameDto: CreateGameDto) {
    const game = await this.prisma.game.create({
      data: {
        ...createGameDto,
        records: {
          create: createGameDto.records,
        },
        bans: {
          create: createGameDto.bans,
        },
        picks: {
          create: createGameDto.picks,
        },
      },
      include: {
        match: {
          include: {
            games: true,
          },
        },
      },
    });
    // 创建game之后，更新match状态和比分
    const { homeTeamId, bo, games } = game.match;
    let { status } = game.match;
    let homeScore = 0;
    let awayScore = 0;
    for (const game of games) {
      if (homeTeamId === game.radiantTeamId) {
        if (game.radiantWin) {
          homeScore += 1;
        } else {
          awayScore += 1;
        }
      } else {
        if (game.radiantWin) {
          awayScore += 1;
        } else {
          homeScore += 1;
        }
      }
    }
    if (homeScore + awayScore === bo) {
      status = 2;
    } else {
      status = [homeScore, awayScore].some((item) => Number(item) > bo / 2) ? 2 : 1;
    }
    await this.prisma.match.update({
      where: { id: game.matchId },
      data: {
        homeScore,
        awayScore,
        status,
      },
    });
    return game;
  }

  async findPaginated(
    id: string,
    pagination: PaginationDto,
  ): Promise<PaginatedResponseDto<GameEntity>> {
    const { current = 1, pageSize = 10, orderBy = 'startTime', sortOrder = 'desc' } = pagination;
    const skip = (current - 1) * pageSize;
    const take = pageSize;
    const whereConditions: Prisma.GameWhereInput = {};
    if (id) {
      whereConditions.id = { equals: id };
    }
    const listPromise = this.prisma.game.findMany({
      where: whereConditions,
      include: {
        radiant: {
          select: {
            tag: true,
          },
        },
        dire: {
          select: {
            tag: true,
          },
        },
        tournament: {
          select: {
            title: true,
          },
        },
        stage: {
          select: {
            title: true,
          },
        },
      },
      take,
      skip,
      orderBy: orderBy ? { [orderBy]: sortOrder } : undefined,
    });
    const totalPromise = this.prisma.game.count({
      where: whereConditions,
    });
    const [list, total] = await Promise.all([listPromise, totalPromise]);

    return {
      list,
      total,
    };
  }

  findAll() {
    return this.prisma.game.findMany({
      orderBy: [{ startTime: 'desc' }],
      include: {
        radiant: true,
        dire: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.game.findUnique({
      where: { id },
      include: {
        tournament: true,
        stage: true,
        radiant: true,
        dire: true,
        records: true,
        bans: true,
        picks: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.game.delete({
      where: { id },
    });
  }
}
