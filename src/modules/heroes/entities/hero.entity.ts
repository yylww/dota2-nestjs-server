import { ApiProperty } from "@nestjs/swagger";
import { Hero } from "@prisma/client";

export class HeroEntity implements Hero {
  @ApiProperty()
  name: string;
  
  @ApiProperty()
  id: number;
  
  @ApiProperty()
  cname: string;
  
  @ApiProperty()
  avatar: string;
  
  @ApiProperty()
  createdAt: Date;
  
  @ApiProperty()
  updatedAt: Date;
}