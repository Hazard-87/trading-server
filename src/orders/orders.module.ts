import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'
import { OrderEntity } from './entities/order.entity'
import { ImagesService } from '../images/images.service'
import { ImageEntity } from '../images/entities/image.entity'
import { UsersService } from '../users/users.service'
import { UserEntity } from '../users/entities/user.entity'
import { DepositsService } from '../deposits/deposits.service'
import { DepositEntity } from '../deposits/entities/deposit.entity'

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, ImageEntity, UserEntity, DepositEntity])],
  controllers: [OrdersController],
  providers: [OrdersService, ImagesService, UsersService, DepositsService]
})
export class OrdersModule {}
