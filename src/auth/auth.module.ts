import { APP_GUARD } from '@nestjs/core'
import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants'
import { UsersService } from '../users/users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '../users/entities/user.entity'
import { AuthGuard } from '../guards/auth.guard'
import { DepositsService } from '../deposits/deposits.service'
import { DepositEntity } from '../deposits/entities/deposit.entity'

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([UserEntity, DepositEntity]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '900s' }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    DepositsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  exports: [AuthService]
})
export class AuthModule {}
