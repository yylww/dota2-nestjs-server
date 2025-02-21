import { Injectable } from '@nestjs/common';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
import { PrismaService } from '../prisma/prisma.service';
import { StageEntity } from './entities/stage.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Prisma } from '@prisma/client';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';

@Injectable()
export class StagesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createStageDto: CreateStageDto) {
    return this.prisma.stage.create({ data: createStageDto });
  }

  findAll() {
    return this.prisma.stage.findMany();
  }

  async findPaginated(
    tournamentId: number,
    pagination: PaginationDto,
  ): Promise<PaginatedResponseDto<StageEntity>> {
    const { current = 1, pageSize = 10, orderBy = 'id', sortOrder = 'desc' } = pagination;
    const skip = (current - 1) * pageSize;
    const take = pageSize;
    const whereConditions: Prisma.StageWhereInput = {};
    if (tournamentId) {
      whereConditions.tournamentId = { equals: tournamentId };
    }
    const listPromise = this.prisma.stage.findMany({
      where: whereConditions,
      include: {
        tournament: {
          select: {
            title: true,
          },
        },
      },
      take,
      skip,
      orderBy: orderBy ? { [orderBy]: sortOrder } : undefined,
    });
    const totalPromise = this.prisma.stage.count({
      where: whereConditions,
    });
    const [list, total] = await Promise.all([listPromise, totalPromise]);

    return {
      list,
      total,
    };
  }

  findOne(id: number) {
    return this.prisma.stage.findUnique({
      where: { id },
    });
  }

  update(id: number, updateStageDto: UpdateStageDto) {
    return this.prisma.stage.update({
      where: { id },
      data: updateStageDto,
    });
  }

  remove(id: number) {
    return this.prisma.stage.delete({
      where: { id },
    });
  }
}
