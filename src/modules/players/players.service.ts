import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { Prisma } from '@prisma/client';
import { PlayerEntity } from './entities/player.entity';

@Injectable()
export class PlayersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPlayerDto: CreatePlayerDto) {
    return this.prisma.player.create({
      data: createPlayerDto,
    });
  }

  findAll() {
    return this.prisma.player.findMany();
  }

  async findPaginated(
    id: number,
    nickname: string,
    teamId: number,
    pagination: PaginationDto,
  ): Promise<PaginatedResponseDto<PlayerEntity>> {
    const { current = 1, pageSize = 10, orderBy, sortOrder } = pagination;
    const skip = (current - 1) * pageSize;
    const take = pageSize;
    const whereConditions: Prisma.PlayerWhereInput = {};
    if (id) {
      whereConditions.id = { equals: id };
    }
    if (nickname) {
      whereConditions.nickname = { contains: nickname, mode: 'insensitive' };
    }
    if (teamId) {
      whereConditions.teamId = { equals: teamId };
    }
    const listPromise = this.prisma.player.findMany({
      where: whereConditions,
      include: {
        team: {
          select: {
            name: true,
          },
        },
      },
      take,
      skip,
      orderBy: orderBy ? { [orderBy]: sortOrder } : undefined,
    });
    const totalPromise = this.prisma.player.count({
      where: whereConditions,
    });
    const [list, total] = await Promise.all([listPromise, totalPromise]);

    return {
      list,
      total,
    };
  }

  findOne(id: number) {
    return this.prisma.player.findUnique({
      where: { id },
    });
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return this.prisma.player.update({
      where: { id },
      data: updatePlayerDto,
    });
  }

  remove(id: number) {
    return this.prisma.player.delete({
      where: { id },
    });
  }
}
