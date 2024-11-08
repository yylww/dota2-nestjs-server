import { ApiProperty } from "@nestjs/swagger";

export class FileUploadEntity {
  @ApiProperty()
  filePath: string;
}