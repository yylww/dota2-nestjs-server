import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { RegionEntity } from './entities/region.entity';
import { ApiOkResponsePaginated } from 'src/common/decorators/paginated-response.decorator';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
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

  @Get('all')
  async findAll(): Promise<RegionEntity[]> {
    return this.regionsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: RegionEntity })
  findOne(@Param('id') id: string): Promise<RegionEntity> {
    return this.regionsService.findOne(Number(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: RegionEntity })
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto): Promise<RegionEntity> {
    return this.regionsService.update(+id, updateRegionDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: RegionEntity })
  remove(@Param('id') id: string): Promise<RegionEntity> {
    return this.regionsService.remove(Number(id));
  }
}
