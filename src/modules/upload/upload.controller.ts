import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { FileUploadDto } from './dto/file-upload.dto';
import { FileUploadEntity } from './entities/file-upload.entity';

@ApiBearerAuth()
@Controller('upload')
export class UploadController {

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDto })
  @ApiQuery({ name: 'dir', required: false })
  @ApiOkResponse({ type: FileUploadEntity })
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 }),
        ]
      })
    ) file: Express.Multer.File,
    @Query('dir') dir: string,
  ) {
    return {
      filePath: `/${dir}/${file.filename}`,
    };
  }
}
