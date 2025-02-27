import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { ApiQuery } from '@nestjs/swagger';
import { ApiPagination } from 'src/common/decorators/api-pagination.decorator';
import { ApiOkResponsePaginated } from 'src/common/decorators/paginated-response.decorator';
import { RecordEntity } from './entities/record.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  create(@Body() createRecordDto: CreateRecordDto) {
    return this.recordsService.create(createRecordDto);
  }

  @Get()
  @ApiQuery({ name: 'id', type: String, required: false })
  @ApiQuery({ name: 'nickname', type: String, required: false })
  @ApiQuery({ name: 'teamId', type: String, required: false })
  @ApiPagination()
  @ApiOkResponsePaginated(RecordEntity)
  async findPaginated(
    @Query() pagination: PaginationDto,
    @Query('playerId') playerId?: string,
  ): Promise<PaginatedResponseDto<RecordEntity>> {
    return this.recordsService.findPaginated(+playerId, pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recordsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordsService.remove(+id);
  }
}
