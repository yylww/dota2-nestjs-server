import { ApiProperty } from "@nestjs/swagger";
import { Region } from "@prisma/client";

export class RegionEntity implements Region {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  cname: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
