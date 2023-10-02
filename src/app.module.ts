import { join } from 'path'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServeStaticModule } from '@nestjs/serve-static'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { OrdersModule } from './orders/orders.module'
import { UsersModule } from './users/users.module'
import { ImagesModule } from './images/images.module'
import { AuthModule } from './auth/auth.module'
import { DepositsModule } from './deposits/deposits.module'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-icy-sun-981326.eu-central-1.aws.neon.tech',
      port: 5432,
      username: 'Hazard-87',
      password: 'bE4KCHFePSr3',
      database: 'tradingdb',
      entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
      ssl: true,
      autoLoadEntities: true,
      synchronize: true
    }),
    AuthModule,
    OrdersModule,
    UsersModule,
    ImagesModule,
    DepositsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
