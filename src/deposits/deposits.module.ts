import { Module } from '@nestjs/common'
import { DepositsService } from './deposits.service'
import { DepositsController } from './deposits.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '../users/entities/user.entity'
import { DepositEntity } from './entities/deposit.entity'
import { UsersService } from '../users/users.service'

@Module({
  imports: [TypeOrmModule.forFeature([DepositEntity, UserEntity])],
  controllers: [DepositsController],
  providers: [DepositsService, UsersService]
})
export class DepositsModule {}
