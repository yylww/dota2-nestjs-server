import { Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Prisma } from '@prisma/client';
import { RecordEntity } from './entities/record.entity';

@Injectable()
export class RecordsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createRecordDto: CreateRecordDto) {
    return this.prisma.record.create({
      data: createRecordDto,
    });
  }

  async findPaginated(
    playerId: number,
    pagination: PaginationDto,
  ): Promise<PaginatedResponseDto<RecordEntity>> {
    const { current = 1, pageSize = 10, orderBy = 'createdAt', sortOrder = 'desc' } = pagination;
    const skip = (current - 1) * pageSize;
    const take = pageSize;
    const whereConditions: Prisma.RecordWhereInput = {};
    if (playerId) {
      whereConditions.playerId = { equals: playerId };
    }
    const listPromise = this.prisma.record.findMany({
      where: whereConditions,
      include: {
        player: {
          select: {
            nickname: true,
            team: {
              select: {
                tag: true,
              },
            },
          },
        },
        hero: {
          select: {
            cname: true,
          },
        },
      },
      take,
      skip,
      orderBy: orderBy ? { [orderBy]: sortOrder } : undefined,
    });
    const totalPromise = this.prisma.record.count({
      where: whereConditions,
    });
    const [list, total] = await Promise.all([listPromise, totalPromise]);

    return {
      list,
      total,
    };
  }

  findOne(id: number) {
    return this.prisma.record.findUnique({
      where: { id },
    });
  }

  remove(id: number) {
    return this.prisma.record.delete({
      where: {
        id,
      },
    });
  }
}
