import { ApiQuery } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

interface PaginationDefaults {
  current?: number;
  pageSize?: number;
  orderBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export function ApiPagination(defaultValues: PaginationDefaults = {}) {
  const { current = 1, pageSize = 10, orderBy = 'createdAt', sortOrder = 'asc' } = defaultValues;
  return applyDecorators(
    ApiQuery({
      name: 'current',
      type: Number,
      default: current,
      required: false,
    }),
    ApiQuery({
      name: 'pageSize',
      type: Number,
      default: pageSize,
      required: false,
    }),
    ApiQuery({
      name: 'orderBy',
      type: String,
      default: orderBy,
      required: false,
    }),
    ApiQuery({
      name: 'sortOrder',
      enum: ['asc', 'desc'],
      default: sortOrder,
      required: false,
    }),
  );
}
