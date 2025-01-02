import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDto<T> {
  @ApiProperty()
  list: T[];

  @ApiProperty()
  total: number;
}
