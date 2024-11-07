import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs'

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          const dir = `./assets/images/${req.query.dir || ''}`
          const dirExist = fs.existsSync(dir);
          if (!dirExist) {
            fs.mkdir(dir, error => cb(error, dir));
          } else {
            cb(null, dir);
          }
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
