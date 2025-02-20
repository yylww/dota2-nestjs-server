import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateRegionDto } from './dto/update-region.dto';
import { CreateRegionDto } from './dto/create-region.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { RegionEntity } from './entities/region.entity';

@Injectable()
export class RegionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.region.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number): Promise<RegionEntity> {
    return this.prisma.region.findUnique({ where: { id } });
  }

  async create(data: CreateRegionDto): Promise<RegionEntity> {
    return this.prisma.region.create({ data });
  }

  async update(id: number, data: UpdateRegionDto): Promise<RegionEntity> {
    return this.prisma.region.update({ where: { id }, data });
  }

  async remove(id: number): Promise<RegionEntity> {
    return this.prisma.region.delete({ where: { id } });
  }
}
