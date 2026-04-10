import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Req,
  Logger,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from './storage.service';
import { ApiConsumes, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('storage')
@Controller('storage')
export class StorageController {
  private readonly logger = new Logger(StorageController.name);

  constructor(private readonly storageService: StorageService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: any) {
    this.logger.debug(`REQUEST HEADERS: ${JSON.stringify(req.headers)}`);
    this.logger.debug(`REQUEST BODY: ${JSON.stringify(req.body)}`);
    this.logger.debug(`FILE PRÉSENT ?: ${file ? 'OUI' : 'NON (undefined)'}`);
    
    if (!file) {
      throw new BadRequestException('Aucun fichier fourni dans la requête.');
    }
    
    return this.storageService.uploadFile(file, 'uploads');
  }
}
