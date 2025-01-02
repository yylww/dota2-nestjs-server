import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiBearerAuth, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';
import { RegionEntity } from './entities/region.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiOkResponsePaginated } from 'src/common/decorators/paginated-response.decorator';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { ApiPagination } from 'src/common/decorators/api-pagination.decorator';
import { RegionsService } from './regions.service';
@ApiBearerAuth()
@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Post()
  @ApiOkResponse({ type: RegionEntity })
  create(@Body() createRegionDto: CreateRegionDto): Promise<RegionEntity> {
    return this.regionsService.create(createRegionDto);
  }

  @Get()
  @ApiQuery({ name: 'take', type: Number, required: false })
  @ApiPagination()
  @ApiOkResponsePaginated(RegionEntity)
  async findFiltered(): Promise<PaginatedResponseDto<RegionEntity>> {
    return this.regionsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: RegionEntity })
  findOne(@Param('id') id: string): Promise<RegionEntity> {
    return this.regionsService.findOne(Number(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: RegionEntity })
  update(@Body() updateRegionDto: UpdateRegionDto & { id: number }): Promise<RegionEntity> {
    return this.regionsService.update(updateRegionDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: RegionEntity })
  delete(@Param('id') id: string) {
    return this.regionsService.delete(Number(id));
  }
}
