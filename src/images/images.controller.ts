import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { ImagesService } from './images.service'
import { UpdateImageDto } from './dto/update-image.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'

@Controller('images')
@ApiTags('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.imagesService.create(file)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.imagesService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateImageDto) {
    return this.imagesService.update(+id, dto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.imagesService.remove(+id)
    return {
      status: 'OK'
    }
  }
}
