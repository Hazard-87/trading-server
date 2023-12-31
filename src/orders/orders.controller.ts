import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req
} from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { OrdersService } from './orders.service'
import { OrderEntity } from './entities/order.entity'
import { CreateOrderDto, QueryArg } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { CloseOrderDto } from './dto/close-order.dto'
import { UsersService } from '../users/users.service'

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService, readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Req() req, @Body() dto: CreateOrderDto) {
    const user = await this.usersService.findOneById(req.user.userId)
    return this.ordersService.create(dto, user)
  }

  @Get('history')
  async findHistory(@Req() req) {
    const user = await this.usersService.findOneById(req.user.userId)
    return this.ordersService.history(user.id)
  }

  @ApiOkResponse({
    type: [OrderEntity]
  })
  @Get()
  async findByParams(@Req() req, @Query() query?: QueryArg) {
    const user = await this.usersService.findOneById(req.user.userId)
    if (query.id) {
      return this.ordersService.findOne(query.id)
    } else {
      return this.ordersService.findAll(query, user.id)
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return this.ordersService.update(+id, dto)
  }

  @Patch(':id/close')
  async closeOrder(@Param('id') id: string, @Body() dto: CloseOrderDto) {
    return this.ordersService.close(+id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id)
  }
}
