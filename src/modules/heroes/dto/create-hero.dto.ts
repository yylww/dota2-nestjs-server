import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateHeroDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  cname: string;

  @IsString()
  @IsNotEmpty()
  avatar: string;
}
