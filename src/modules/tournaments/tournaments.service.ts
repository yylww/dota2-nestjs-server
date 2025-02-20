import { Injectable } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { Prisma } from '@prisma/client';
import { TournamentEntity } from './entities/tournament.entity';

@Injectable()
export class TournamentsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTournamentDto: CreateTournamentDto) {
    return this.prisma.tournament.create({
      data: createTournamentDto,
    });
  }

  findAll() {
    return this.prisma.tournament.findMany({
      select: {
        id: true,
        title: true,
        stages: {
          select: {
            id: true,
            title: true,
            matches: {
              select: {
                id: true,
                homeTeam: {
                  select: {
                    tag: true,
                  },
                },
                awayTeam: {
                  select: {
                    tag: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        startDate: 'desc',
      },
    });
  }

  async findPaginated(
    title: string,
    pagination: PaginationDto,
  ): Promise<PaginatedResponseDto<TournamentEntity>> {
    const { current = 1, pageSize = 10, orderBy = 'id', sortOrder = 'desc' } = pagination;
    const skip = (current - 1) * pageSize;
    const take = pageSize;
    const whereConditions: Prisma.TournamentWhereInput = {};
    if (title) {
      whereConditions.title = { contains: title, mode: 'insensitive' };
    }
    const listPromise = this.prisma.tournament.findMany({
      where: whereConditions,
      take,
      skip,
      orderBy: { [orderBy]: sortOrder },
    });
    const totalPromise = this.prisma.tournament.count({
      where: whereConditions,
    });
    const [list, total] = await Promise.all([listPromise, totalPromise]);

    return {
      list,
      total,
    };
  }

  findOne(id: number) {
    return this.prisma.tournament.findUnique({
      where: { id },
    });
  }

  update(id: number, updateTournamentDto: UpdateTournamentDto) {
    return this.prisma.tournament.update({
      where: { id },
      data: updateTournamentDto,
    });
  }

  remove(id: number) {
    return this.prisma.tournament.delete({
      where: { id },
    });
  }
}
