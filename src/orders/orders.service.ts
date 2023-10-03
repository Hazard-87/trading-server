import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Brackets, Repository } from 'typeorm'
import { OrderEntity } from './entities/order.entity'
import { ImagesService } from '../images/images.service'
import { UpdateOrderDto } from './dto/update-order.dto'
import { CreateOrderDto } from './dto/create-order.dto'
import { CloseOrderDto } from './dto/close-order.dto'
import { UserEntity } from '../users/entities/user.entity'
import { DepositsService } from '../deposits/deposits.service'

interface HistoryItem {
  entityID: number
  date: Date
  profit: number
  entity: string
}

@Injectable()
export class OrdersService {
  constructor(
    private imagesService: ImagesService,
    private depositsService: DepositsService,
    @InjectRepository(OrderEntity)
    private repository: Repository<OrderEntity>
  ) {}

  getProfit(dto: CreateOrderDto): number {
    if (dto.closePrice) {
      return dto.direction === 'long'
        ? (+dto.closePrice - +dto.openPrice) * dto.lot
        : (+dto.openPrice - +dto.closePrice) * dto.lot
    } else {
      return 0
    }
  }

  async create(dto: CreateOrderDto, user: UserEntity) {
    const images = dto.images ? await this.imagesService.findImagesByIds(dto.images) : []
    const profit = this.getProfit(dto)
    const result = await this.repository.save({
      ...dto,
      user,
      status: dto.closePrice ? 'CLOSED' : 'OPENED',
      currentStopLoss: dto.stopLoss,
      profit: profit,
      images
    })

    return await this.findOne(result.id)
  }

  async history(userId: number) {
    const orders = await this.findAll({ limit: 'all', status: 'CLOSED' }, userId)
    const deposits = await this.depositsService.findAll({ limit: 'all' }, userId)

    const history: HistoryItem[] = [
      ...orders.result.map((item) => {
        return {
          entityID: item.id,
          date: item.closeDate as Date,
          profit: item.profit,
          entity: 'order'
        }
      }),
      ...deposits.result.map((item) => {
        return {
          entityID: item.id,
          date: item.date as Date,
          profit: item.count,
          entity: 'deposit'
        }
      })
    ]

    const startSum = 0
    const result = []
    const sortedOrders = history.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )

    sortedOrders.forEach((item, i) => {
      const startDeposit = (i ? result[i - 1].deposit : 0) + startSum
      result.push({
        ...item,
        deposit: startDeposit + item.profit
      })
    })

    return result
  }

  async findOne(id: number) {
    return await this.repository.findOne({
      where: { id },
      relations: { images: true }
    })
  }

  async findAll(query, userId: number) {
    const limit = 10

    const qb = this.repository
      .createQueryBuilder('orders')
      .where(':id = (orders.user)', { id: userId })
      .leftJoinAndSelect('orders.images', 'images')
      .orderBy('orders.id', query.order || 'ASC')

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

  async update(id: number, dto: UpdateOrderDto) {
    const images = (await this.findOne(id)).images.map((item) => item.id)
    const items = await this.imagesService.findImagesByIds(dto.images || images)

    await this.repository.update(id, { ...dto, images: items })
    return this.findOne(id)
  }

  async close(id: number, dto: CloseOrderDto) {
    const images = (await this.findOne(id)).images.map((item) => item.id)
    const items = await this.imagesService.findImagesByIds(dto.images || images)
    const item = await this.findOne(id)

    const profit =
      item.direction === 'long'
        ? (+dto.closePrice - +item.openPrice) * item.lot
        : (+item.openPrice - +dto.closePrice) * item.lot
    await this.repository.update(id, { ...dto, profit, status: 'CLOSED', images: items })
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
