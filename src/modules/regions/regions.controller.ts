import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiBearerAuth, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';
import { RegionEntity } from './entities/region.entity';
import { SortOrder } from 'src/common/enums/sort-order.enum';
import { FilterDto } from 'src/common/dto/filter.dto';
import { ApiOkResponsePaginated } from 'src/common/decorators/paginated.decorator';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';

@ApiBearerAuth()
@Controller('regions')
export class RegionsController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  @ApiOkResponse({ type: RegionEntity })
  create(@Body() createRegionDto: CreateRegionDto): Promise<RegionEntity> {
    return this.prisma.region.create({
      data: createRegionDto,
    });
  }

  @Get()
  @ApiQuery({ name: 'take', type: Number, required: false })
  @ApiQuery({ name: 'skip', type: Number, required: false })
  @ApiQuery({ name: 'query', type: String, required: false })
  @ApiQuery({ name: 'orderBy', type: String, required: false })
  @ApiQuery({ name: 'sortOrder', enum: SortOrder, required: false })
  @ApiOkResponsePaginated(RegionEntity)
  async findFiltered(
    @Query() filter: FilterDto,
    @Query('query') query?: string,
  ): Promise<PaginatedResponseDto<RegionEntity>> {
    const { take, skip, orderBy, sortOrder } = filter;
    const list = await this.prisma.region.findMany({
      where: {
        OR: query ? [
          { id: { equals: Number(query) || undefined } },
          { name: { contains: query, mode: 'insensitive' } },
          { cname: { contains: query, mode: 'insensitive' } },
        ] : undefined,
      },
      take,
      skip,
      orderBy: orderBy ? {
        [orderBy]: sortOrder,
      } : undefined,
    })
    const total = await this.prisma.region.count();
    return {
      list,
      total,
    };
  }

  @Get(':id')
  @ApiOkResponse({ type: RegionEntity })
  findOne(@Param('id') id: number): Promise<RegionEntity> {
    return this.prisma.region.findUnique({
      where: { id },
    });
  }

  @Patch(':id')
  @ApiOkResponse({ type: RegionEntity })
  update(@Param('id') id: number, @Body() updateRegionDto: UpdateRegionDto): Promise<RegionEntity> {
    return this.prisma.region.update({
      where: { id }, 
      data: updateRegionDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    // return this.prisma.region.update({
    //   where: { id },
    //   data: {
    //     isDelete: true,
    //   },
    // });
  }
}
