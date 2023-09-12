import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, NotFoundException } from '@nestjs/common'
import { ImageEntity } from './entities/image.entity'
import { CreateImageDto } from './dto/create-image.dto'
import { UpdateImageDto } from './dto/update-image.dto'

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImageEntity)
    private repository: Repository<ImageEntity>
  ) {}

  base64_encode(file) {
    return 'data:image/gif;base64,' + new Buffer(file).toString('base64')
  }

  create(file: Express.Multer.File) {
    const base64str = this.base64_encode(file.buffer)
    const dto: CreateImageDto = {
      url: base64str
    }
    return this.repository.save(dto)
  }

  findOne(id: number) {
    return this.repository.findOneById(id)
  }

  findImagesByIds(id: number[]) {
    return this.repository.findByIds(id)
  }

  update(id: number, dto: UpdateImageDto) {
    return this.repository.update(id, dto)
  }

  async remove(id: number) {
    const result = await this.findOne(id)
    if (!result) {
      throw new NotFoundException('Такой файл не найден')
    }
    return this.repository.delete(id)
  }
}
