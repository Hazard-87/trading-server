import { Injectable, NotFoundException } from '@nestjs/common'
import { UpdateDepositDto } from './dto/update-deposit.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Brackets, Repository } from 'typeorm'
import { DepositEntity } from './entities/deposit.entity'
import { CreateDepositDto } from './dto/create-deposit.dto'
import { UserEntity } from '../users/entities/user.entity'

@Injectable()
export class DepositsService {
  constructor(
    @InjectRepository(DepositEntity)
    private repository: Repository<DepositEntity>
  ) {}

  async create(dto: CreateDepositDto, user: UserEntity) {
    const current = await this.findCurrent(user.id)
    const currentCount = current?.count || 0
    const result = await this.repository.save({
      ...dto,
      count: currentCount + dto.count,
      user
    })
    return await this.findOne(result.id)
  }

  async findCurrent(userId: number) {
    const qb = this.repository
      .createQueryBuilder('deposits')
      .where(':id = (deposits.user)', { id: userId })
      .orderBy('deposits.id', 'DESC')

    return await qb.getOne()
  }

  async findAll(query, userId: number) {
    const limit = 10

    const qb = this.repository
      .createQueryBuilder('deposits')
      .where(':id = (deposits.user)', { id: userId })
      .orderBy('deposits.id', query.order || 'ASC')

    if (!query.limit) {
      qb.take(limit)
    } else if (query.limit !== 'all') {
      qb.take(+query.limit || limit)
    }
    qb.skip(+query.offset || 0)

    delete query.limit
    delete query.offset
    delete query.order

    const items = []
    const params = []
    const keys = Object.keys(query)
    keys.forEach((key) => {
      if (Array.isArray(query[key])) {
        query[key].forEach((item) => {
          items.push({ [key]: item })
        })
      } else {
        params.push({ [key]: query[key] })
      }
    })

    qb.andWhere(params).andWhere(
      new Brackets((qb) => {
        items.forEach((item, idx) => {
          if (idx === 0) {
            qb.where(item)
          } else {
            qb.orWhere(item)
          }
        })
      })
    )

    const [result, total] = await qb.getManyAndCount()

    return {
      result,
      total
    }
  }

  async findOne(id: number) {
    return await this.repository.findOne({
      where: { id }
    })
  }

  async update(id: number, dto: UpdateDepositDto) {
    await this.repository.update(id, { ...dto })
    return this.findOne(id)
  }

  async remove(id: number) {
    const result = await this.findOne(id)
    if (!result) {
      throw new NotFoundException('Такой файл не найден')
    }
    await this.repository.delete(id)
    return {
      status: 'OK'
    }
  }
}
