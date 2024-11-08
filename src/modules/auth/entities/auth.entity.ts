import { ApiProperty } from "@nestjs/swagger";

export class AuthEntity {
  @ApiProperty()
  username: string;
  
  @ApiProperty()
  email: string;
  
  @ApiProperty()
  token: string;
}